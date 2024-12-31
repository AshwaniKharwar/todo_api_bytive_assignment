import {model, Schema} from "mongoose";

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: true,
        trim: true,
        index: true,
    },
    fullname: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    tasks: [
        {
            type: Schema.Types.ObjectId,
            ref: "Task"
        }
    ]

}, {timestamps: true});

export const User = model("User", userSchema);