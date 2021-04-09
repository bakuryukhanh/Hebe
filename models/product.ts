import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";
import database from "../db";
const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    imgSrcs: Array,
    category: String,
    collection: String,
    decription: String,
    soldStock: Number,
    isHot: Boolean,
    isNew: Boolean,
    discount: Number,
});
productSchema.plugin(paginate);
productSchema.index({ name: "text" });
let productModel = database.model("product", productSchema);
export default productModel;
