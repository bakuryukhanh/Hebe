import mongoose from "mongoose";
const DB_URL =
    "mongodb+srv://bakuryukhanh:khanhkhanh1@cluster0.6nw5i.mongodb.net/hebe?retryWrites=true&w=majority";
const option = { useNewUrlParser: true, useUnifiedTopology: true };
export const connectDB = () => {
    mongoose
        .connect(DB_URL, option)
        .then(() => {
            console.log("Database connection successful");
        })
        .catch((err) => {
            console.error("Database connection error");
        });
};
export default mongoose;
