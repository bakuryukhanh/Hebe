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
    wishList: { type: [mongoose.Schema.Types.ObjectId], ref: "product" },
});
export interface IUser extends mongoose.Document {
    username: string;
    password: string;
    avatar: string;
    firstname: string;
    lastname: string;
    address: string;
    phoneNumber: string;
    emale: string;
}
export let userModel = database.model("user", userSchema);
