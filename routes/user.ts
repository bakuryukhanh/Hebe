import express from "express";
import "../auth/passport";
import passport from "passport";
import { IUser } from "../models/user";
import { IVerifyOptions } from "passport-local";
import { userModel } from "../models/user";
import { to } from "await-to-js";
import bcrypt from "bcrypt";
const Router = express.Router();
Router.post(
    "/login",
    (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        passport.authenticate(
            "local",
            (err: Error, user: IUser, info: IVerifyOptions) => {
                if (err) {
                    return res.json({ error: err.message });
                }
                if (!user) {
                    return res.json({
                        error: "Username or password is incorrect",
                    });
                }
                req.logIn(user, (err) => {
                    if (err) {
                        return res.json({ error: err.message });
                    }
                    return res.json({ user });
                });
            }
        )(req, res, next);
    }
);
Router.get("/", (req: express.Request, res: express.Response) => {
    if (!req.user) {
        return res.status(401).json({ error: "unauthorized" });
    }
    return res.json(req.user);
});
Router.post(
    "/register",
    async (req: express.Request, res: express.Response) => {
        console.log(req.body);
        const user = { ...req.body };
        var [error, existUser] = await to(
            userModel.findOne({ username: user.username }).exec()
        );
        if (existUser) return res.json({ error: "Existing UserName" });
        var [error, hashPassword] = await to(bcrypt.hash(user.password, 10));
        user.password = hashPassword;
        const newUser = new userModel(user);
        var [error] = await to(newUser.save());
        if (error) return res.json({ error: error.message });
        return res.json(user);
    }
);
export default Router;
