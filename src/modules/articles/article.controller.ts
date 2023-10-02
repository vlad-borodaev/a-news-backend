import { Request, Response } from "express";
import getArticleModel from "./models/get-article";
import getArticlesModel from "./models/get-articles";
import articleCommandHandler from "./article.command";
import { IAddArticleDTO } from "./article.types";
import { addArticleValidator } from "./article.validator";

const FALLBACK_ERROR_MESSAGE = "An error occurred";

class ArticleController {
    async getArticle(req: Request, resp: Response) {
        try {
            const article = await getArticleModel.findOne({
                articleId: req.params.id,
            });
            return resp.status(200).json({
                data: article,
            });
        } catch (err: unknown) {
            console.error(err);
            return resp.status(500).json({
                error: (err as any)?.message || FALLBACK_ERROR_MESSAGE,
            });
        }
    }

    async getArticles(_req: Request, resp: Response) {
        try {
            const articles = await getArticlesModel.find();
            return resp.status(200).json({
                data: articles
            });
        } catch (err) {
            console.error(err);
            return resp.status(500).json({
                error: (err as any)?.message || FALLBACK_ERROR_MESSAGE,
            });
        }
    }

    async addArticle(req: Request, resp: Response) {
        try {
            const payload: IAddArticleDTO = req.body;
            addArticleValidator(payload);
            await articleCommandHandler.addArticleOrThrow(payload);
            return resp.status(201).json({
                message: "Article has been successfully added",
            });
        } catch (err) {
            console.error(err);
            return resp.status(500).json({
                error: (err as any)?.message || FALLBACK_ERROR_MESSAGE,
            });
        }
    }

    async removeArticle(req: Request, resp: Response) {
        try {
            await articleCommandHandler.removeArticleOrThrow(req.params.id);
            return resp.status(200).json({
                message: "Article has been successfully removed",
            });
        } catch (err) {
            console.error(err);
            return resp.status(500).json({
                error: (err as any)?.message || FALLBACK_ERROR_MESSAGE,
            });
        }
    }
}

export default new ArticleController();