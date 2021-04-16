import ProductModel, { IProduct } from "../product";
import ProductStockModel, { IProductStock } from "../productStock";
import mongoose from "mongoose";
import { to } from "await-to-js";
export const addNewProduct = async (data: Object) => {
    const newProduct = new ProductModel({ ...data });
    return await to(newProduct.save());
};
export const updateProduct = async (id: IProduct["_id"], data: Object) => {
    return await to(ProductModel.findByIdAndUpdate(id, data).exec());
};
export const deleteProduct = async (id: IProduct["_id"]) => {
    return await to(ProductModel.findByIdAndDelete(id).exec());
};
interface PaginateQueries {}
interface PaginateOptions {
    page?: number;
    limit?: number;
}
export const productPaginate = async (query: PaginateQueries, options = {}) => {
    return await to(
        ProductModel.paginate(query, {
            ...options,
            populate: "productCollection",
        })
    );
};
export const getAllProducts = async () => {
    return await to<IProduct[]>(
        ProductModel.find({}).populate("productCollection", "name").exec()
    );
};
export const getProductByID = async (id: IProduct["_id"]) => {
    return await to(
        ProductModel.findById(id).populate("productCollection", "name").exec()
    );
};
export const getProductStock = async (id: IProduct["_id"]) => {
    return await to(ProductStockModel.find({ productId: id }).exec());
};
export const addProductStock = async (
    pid: IProduct["_id"],
    color: IProductStock["color"],
    size: IProductStock["size"]
) => {
    if (!size || !color) {
        const error = new Error("Size and color are required!!");
        return [error, undefined];
    }
    const newProductStock = new ProductStockModel({
        productId: pid,
        color: color,
        size: size,
    });
    return await to(newProductStock.save());
};
type IUpdateStockOptions = "UPDATE" | "ADD";
export const updateAvailableStock = async (
    pid: IProduct["_id"],
    size: IProductStock["size"],
    color: IProductStock["color"],
    availableStock: IProductStock["availableStock"],
    option?: IUpdateStockOptions
) => {
    const [error, productStock] = await to(
        ProductStockModel.findOne({
            productId: pid,
            size: size,
            color: color,
        }).exec()
    );
    if (error) return [error, undefined];
    if (option === "ADD") {
        productStock.availableStock = availableStock;
    }
    productStock.availableStock = availableStock;
    return await to(productStock.save());
};
export const updateSoldStock = async (
    pid: IProduct["_id"],
    size: IProductStock["size"],
    color: IProductStock["color"],
    soldStock: IProductStock["soldStock"],
    option?: IUpdateStockOptions
) => {
    const [error, productStock] = await to(
        ProductStockModel.findOne({
            productId: pid,
            size: size,
            color: color,
        }).exec()
    );
    if (error) return [error, undefined];
    if (option === "ADD") {
        productStock.soldStock += soldStock;
    }
    productStock.soldStock = soldStock;
    return await to(productStock.save());
};
export const searchProduct = async (searchString: any) => {
    if (typeof searchString === "string") {
        const regEx = new RegExp(searchString, "g");
        return await to(
            ProductModel.find({ name: regEx })
                .populate("productCollection", "name")
                .limit(5)
                .exec()
        );
    }
};
