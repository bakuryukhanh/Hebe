import database from "../db";
import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        default: "https://image.flaticon.com/icons/png/512/147/147144.png",
    },
    firstName: String,
    lastName: String,
    address: String,
    phoneNumber: String,
    email: String,
    wishList: Array,
});
export let userModel = database.model("user", userSchema);
export interface User {
    username: string;
    password: string;
    avatar: string;
    firstName: string;
    lastName: string;
    address: String;
    phoneNumber: String;
    email: String;
}
export interface UserDocument extends mongoose.Document, User {
    wishList: Array<mongoose.Types.ObjectId>;
}
