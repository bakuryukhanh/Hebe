import passport from "passport";
import passportLocal from "passport-local";
import bcrypt from "bcrypt";
import { to } from "await-to-js";
import { UserDocument, userModel } from "../models/user";
import { NativeError } from "mongoose";
const LocalStrategy = passportLocal.Strategy;
passport.use(
    new LocalStrategy(function (username, password, done) {
        userModel.findOne(
            { username: username },
            async function (err: NativeError, user: UserDocument) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(null, false, {
                        message: "Incorrect username or password.",
                    });
                }
                const [error, result] = await to(
                    bcrypt.compare(password, user.password)
                );
                if (error || !result) {
                    return done(null, false, {
                        message: "Incorrect username or password.",
                    });
                }
                return done(null, user);
            }
        );
    })
);
passport.serializeUser(function (user, done) {
    done(null, user);
});
passport.deserializeUser(function (id, done) {
    userModel.findById(id, (err: NativeError, user: UserDocument) => {
        done(err, user);
    });
});
