import { Schema, Model, Document, PaginateModel } from "mongoose";
import paginate from "mongoose-paginate-v2";
import database from "../db";
const productSchema = new Schema({
    name: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    imgSrcs: {
        type: [String],
        default: [
            "https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png",
        ],
    },
    category: String,
    productCollection: {
        type: Schema.Types.ObjectId,
        ref: "productCollection",
    },
    decription: String,
    isHotP: { type: Boolean, default: false },
    isNewP: { type: Boolean, default: false },
    discount: { type: Number, default: 0 },
});
export interface IProduct extends Document {
    name: string;
    productCollection: Schema.Types.ObjectId;
    price: number;
    imgSrcs: string[];
    isHotP: boolean;
    isNewP: boolean;
    discount: number;
    category: string;
    decription: string;
}

productSchema.plugin(paginate);
productSchema.index({ name: "text" });
interface ProductModel<T extends Document> extends PaginateModel<T> {}
let productModel: ProductModel<IProduct> = database.model(
    "product",
    productSchema
);
export default productModel;
