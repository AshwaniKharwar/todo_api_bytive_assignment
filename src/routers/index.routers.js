import {Router} from "express";
import tasksRouter from "./tasks.router.js"
import { authenticateToken } from "../middlewares/auth.middleware.js";
import { register, login } from "../controllers/auth.controller.js";

const router = Router();


router.get("/", (req, res) => {
    res.json({
        message: "server is running fine."
    })
})

router.post("/register", register);
router.post("/login", login);

// for all tasks routers
router.use("/tasks", authenticateToken, tasksRouter);



export  default router;