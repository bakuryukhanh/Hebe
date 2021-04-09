import mongoose from "mongoose";
import database from "../db";
const billSchema = new mongoose.Schema({
    products: Array,
    shippingFree: Number,
    total: Number,
    state: Number,
    coupon: mongoose.mongo.ObjectID,
});
const billModel = database.model("Bill", billSchema);
export default billModel;
