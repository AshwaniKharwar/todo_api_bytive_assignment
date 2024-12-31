import {model, Schema} from "mongoose";

const taskSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["pending", "in-progress", "completed"],
        default: "pending",
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }

}, {timestamps: true});

export const Task = model("Task", taskSchema);