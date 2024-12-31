import mongoose from "mongoose";

export const dbConnect = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("Database connected"))
    .catch(() => {
        console.log("Database connection fail!");
        process.exit(1);
    });
};
