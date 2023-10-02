import mongoose from "mongoose";
mongoose.Promise = global.Promise;

const MONGO_URI = process.env.MONGO_URI!;

const db = mongoose
    .connect(MONGO_URI)
    .then(_ => console.info("Connected to DB"))
    .catch((err) => {
        console.error(err);
    });

export default db;
