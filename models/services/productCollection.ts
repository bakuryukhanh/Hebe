import PCollectionModel from "../productCollection";
import { CollectionReview } from "../../utils/types/product";
import { to } from "await-to-js";
export const getAllCollectionsName = async () => {
    return await to(PCollectionModel.find({}).select("name").exec());
};
export const addCollection = async (data: Object) => {
    const newCollection = new PCollectionModel(data);
    return await to(newCollection.save());
};
export const getCollectionsReview = async (numOfProducts: number) => {
    var [error, collections] = await to<CollectionReview[]>(
        new Promise((resolve, reject) => {
            PCollectionModel.aggregate<CollectionReview>([
                {
                    $lookup: {
                        from: "products",
                        localField: "_id",
                        foreignField: "productCollection",
                        as: "products",
                    },
                },
            ]).exec((err, result) => {
                if (err) return reject(err);
                return resolve(result);
            });
        })
    );
    collections?.forEach((collection) => {
        collection.products.length = numOfProducts;
        collection.products.forEach((product: any) => {
            product.productCollection = {
                _id: collection._id,
                name: collection.name,
            };
        });
    });
    if (error) console.log(error);
    return collections;
};
