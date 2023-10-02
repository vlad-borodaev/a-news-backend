import mongoose, { Schema, Document } from "mongoose";
import { IArticle } from "../article.types";

export interface IGetArticlesDocument extends Document {
    articles: Array<IArticle>;
}

const GetArticlesSchema = new Schema<IGetArticlesDocument>(
    {
        articles: [
            {
                _id: false,
                articleId: String,
                title: String,
                description: String,
                genre: String,
                rate: Number,
            }
        ]
    },
    {
        timestamps: true,
    }
);

export default mongoose.model<IGetArticlesDocument>(
    "AllArticles",
    GetArticlesSchema,
);