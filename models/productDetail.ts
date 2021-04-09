import mongoose from "mongoose";
import database from "../db";
const productDetails = new mongoose.Schema({
    productId: mongoose.mongo.ObjectID,
    color: String,
    size: String,
    availableStock: Number,
    soldStock: Number,
});
let productModel = database.model("ProductDetail", productDetails);
export default productModel;
