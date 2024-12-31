import express from "express";
import dotenv from "dotenv";
import { dbConnect } from "./config/database.js";
import rootRouter from "./routers/index.router.js";

dotenv.config({
    path: "./.env"
})

const app = express();
const PORT = process.env.PORT;


app.use(express.json());
app.use("/api/v1", rootRouter);

dbConnect();

app.listen(PORT, () => {
    console.log(`server running on port: ${PORT}`)
})
