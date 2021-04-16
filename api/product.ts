import express from "express";
import mongoose from "mongoose";
import {
    addNewProduct,
    updateProduct,
    getAllProducts,
    getProductByID,
    productPaginate,
    deleteProduct,
    getProductStock,
    addProductStock,
    searchProduct,
} from "../models/services/product";

const removeUndefiedProps = (options: { [key: string]: any }) => {
    for (let key in options) {
        if (options[key] === undefined) delete options[key];
    }
};
const Router = express.Router();
Router.get("/", async (req: express.Request, res: express.Response) => {
    const { page, limit, ...query } = req.query;
    const options = { page, limit };
    removeUndefiedProps(options);
    if (Object.keys(req.query).length === 0) {
        const [error, products] = await getAllProducts();
        if (error) return res.status(400).json({ error: error.message });
        return res.json({ docs: products });
    }
    if (req.query.search) {
        const [error, products] = await searchProduct(req.query.search);
        if (error) return res.status(400).json({ error: error.message });
        return res.json({ docs: products });
    }
    const [error, paginate] = await productPaginate(query, options);
    if (error) return res.status(400).json({ error: error.message });
    return res.json(paginate);
});
Router.get("/:pid", async (req: express.Request, res: express.Response) => {
    const [error, product] = await getProductByID(
        mongoose.Types.ObjectId(req.params.pid)
    );
    if (error) return res.status(400).json({ error: error.message });
    return res.json(product);
});
Router.get(
    "/:pid/stocks",
    async (req: express.Request, res: express.Response) => {
        const [error, stocks] = await getProductStock(req.params.pid);
        if (error) return res.status(400).json({ error: error.message });
        return res.json(stocks);
    }
);
Router.post(
    "/:pid/stocks",
    async (req: express.Request, res: express.Response) => {
        const [error] = await addProductStock(
            req.params.pid,
            req.body.color,
            req.body.size
        );
        if (error) return res.status(400).json({ error: error.message });
        return res.end("done");
    }
);
Router.put("/:pid", async (req: express.Request, res: express.Response) => {
    const [error, product] = await updateProduct(
        mongoose.Types.ObjectId(req.params.pid),
        req.body
    );
    if (error) return res.status(400).json({ error: error.message });
    return res.json(product);
});
Router.post("/", async (req: express.Request, res: express.Response) => {
    const [error] = await addNewProduct(req.body);
    if (error) return res.status(400).json({ error: error.message });
    return res.status(200).end("done");
});
export default Router;
