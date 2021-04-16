import { Schema, Document, Model } from "mongoose";
import database from "../db";
import { IProduct } from "./product";
const ProductStock = new Schema({
    productId: { type: Schema.Types.ObjectId, ref: "products" },
    color: String,
    size: String,
    availableStock: { type: Number, default: 0 },
    soldStock: { type: Number, default: 0 },
});
export interface IProductStock extends Document {
    productId: IProduct["_id"];
    color: string;
    size: string;
    availableStock: number;
    soldStock: number;
}
ProductStock.index({ productId: 1, color: 1, size: 1 }, { unique: true });
let ProductDetailModel: Model<IProductStock> = database.model(
    "ProductStock",
    ProductStock
);
export default ProductDetailModel;
