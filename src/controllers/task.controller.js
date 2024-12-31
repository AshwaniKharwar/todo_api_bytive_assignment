import { Task } from "../models/task.model.js";
import { User } from "../models/user.model.js";

// Get all tasks
export const tasks = async (req, res) => {
    try {
        const allTasks = await Task.find({ author: req.user.userId }).populate('author', 'email fullname');
        return res.status(200).json({
            success: true,
            tasks: allTasks,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch tasks. Please try again later.",
        });
    }
};

// Get task by ID
export const taskByID = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findOne({ _id: id, author: req.user.userId }).populate('author', 'email fullname');

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found",
            });
        }

        return res.status(200).json({
            success: true,
            task,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch task. Please try again later.",
        });
    }
};

// Create a new task
export const createTask = async (req, res) => {
    try {
        const { title, description, status } = req.body;

        // Validate input
        if (!title || !description) {
            return res.status(400).json({
                success: false,
                message: "Title and description are required",
            });
        }

        // Create task
        const newTask = new Task({
            title,
            description,
            status,
            author: req.user.userId,
        });

        const savedTask = await newTask.save();

        // Add task ID to the user's tasks array
        await User.findByIdAndUpdate(req.user.userId, {
            $push: { tasks: savedTask._id },
        });

        return res.status(201).json({
            success: true,
            message: "Task created successfully",
            task: savedTask,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Failed to create task. Please try again later.",
        });
    }
};

// Update a task
export const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, status } = req.body;

        const updatedTask = await Task.findOneAndUpdate(
            { _id: id, author: req.user.userId },
            { title, description, status },
            { new: true }
        );

        if (!updatedTask) {
            return res.status(404).json({
                success: false,
                message: "Task not found or you don't have access to update it",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Task updated successfully",
            task: updatedTask,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Failed to update task. Please try again later.",
        });
    }
};

// Delete a task
export const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedTask = await Task.findOneAndDelete({
            _id: id,
            author: req.user.userId,
        });

        if (!deletedTask) {
            return res.status(404).json({
                success: false,
                message: "Task not found or you don't have access to delete it",
            });
        }

        // Remove task ID from the user's tasks array
        await User.findByIdAndUpdate(req.user.userId, {
            $pull: { tasks: id },
        });

        return res.status(200).json({
            success: true,
            message: "Task deleted successfully",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Failed to delete task. Please try again later.",
        });
    }
};
