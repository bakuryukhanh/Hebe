import mongoose from "mongoose";
import database from "../db";
const adminShema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    firstName: String,
    lastName: String,
});
let adminModel = database.model("admin", adminShema);
export default adminModel;
