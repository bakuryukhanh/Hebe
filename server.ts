import express from "express";
import { connectDB } from "./db";
import session from "express-session";
import passport from "passport";
import UserRoute from "./routes/user";
import ProductAPI from "./api/product";
import CollectionAPI from "./api/collection";
import cors from "cors";
import "./auth/passport";
const app = express();
const port = process.env.PORT || 8000;
var allowedOrigins = ["http://localhost:3000", "http://yourapp.com"];
app.use(
    cors({
        origin: allowedOrigins,
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    session({
        resave: true,
        saveUninitialized: true,
        secret: "some secret",
    })
);
connectDB();
app.use(passport.initialize());
app.use(passport.session());
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
app.use("/user", UserRoute);
app.use("/api/products", ProductAPI);
app.use("/api/collections", CollectionAPI);

module.exports = app;
