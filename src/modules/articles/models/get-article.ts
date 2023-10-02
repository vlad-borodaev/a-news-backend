import mongoose, { Schema, Document } from "mongoose";
import { IArticleRate } from "../article.types";

export interface IArticleDocument extends Document {
    articleId: string;
    title: string;
    description: string;
    genre: string;
    rate: number;
    rateRecord?: Array<IArticleRate>;
}

const ArticleSchema = new Schema<IArticleDocument>({
    articleId: String,
    title: String,
    description: String,
    genre: String,
    rate: {
        type: Number,
        default: 0,
    },
    rateRecord: [
        {
            _id: false,
            rateGotten: Number,
            dateTimestamp: Number,
        }
    ]
});

export default mongoose.model<IArticleDocument>("Article", ArticleSchema);
