import { Document, Schema, Model } from "mongoose";
import database from "../db";
const productCollectionSchema = new Schema({
    name: { type: String, required: true, unique: true },
    decription: String,
    imgSrc: {
        type: String,
        default:
            "//cdn.shopify.com/s/files/1/1132/3440/collections/23275421_1650381511681455_4712280433184074980_o_2048x2048.jpg?v=1530089513",
    },
});
interface ICollection extends Document {
    name: string;
    imgSrc: string;
    description: string;
}
const productCollectionModel: Model<ICollection> = database.model(
    "productCollection",
    productCollectionSchema
);
export default productCollectionModel;
