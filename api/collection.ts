import express from "express";
import {
    getAllCollectionsName,
    addCollection,
    getCollectionsReview,
} from "../models/services/productCollection";
const Router = express.Router();
Router.get("/", async (req: express.Request, res: express.Response) => {
    const [error, collections] = await getAllCollectionsName();
    if (error) return res.status(500).json({ error: error.message });
    return res.json(collections);
});
Router.post("/", async (req: express.Request, res: express.Response) => {
    const data = req.body;
    const [error] = await addCollection(data);
    if (error) return res.status(500).json({ error: error.message });
    return res.end("done");
});
Router.get("/review", async (req: express.Request, res: express.Response) => {
    const collectionsReview = await getCollectionsReview(3);
    return res.json(collectionsReview);
});
export default Router;
