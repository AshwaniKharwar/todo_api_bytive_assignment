import {Router} from "express";
import { tasks,
    taskByID,
    updateTask,
    deleteTask,
    createTask
 } from "../controllers/task.controller.js";

const router = Router();


router.get("/", tasks);
router.get("/:id", taskByID);
router.post("/create", createTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);


export  default router;