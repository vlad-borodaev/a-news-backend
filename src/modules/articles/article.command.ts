import { v4 as uuid } from "uuid";
import client from "@config/redis.config";
import {
    ARTICLE_COMMANDS,
    IAddArticleDTO,
    IArticleCommand,
    STREAMS,
} from "./article.types";
import getArticleModel from "./models/get-article";
import helpers from "@modules/app/helpers";
import eventHandler from "@modules/app/event-handler";

class ArticleCommandHandler {
    async addArticleOrThrow(payload: IAddArticleDTO): Promise<void> {
        const {
            title,
            description,
            genre,
        } = payload;

        const article = await getArticleModel
            .findOne({ title })
            .lean();
        if (article) {
            throw new Error("Article with the same title already exists");
        }

        const articleId = this._generateArticleId();
        const articleData: IArticleCommand = {
            articleId,
            title,
            description,
            genre,
            command: ARTICLE_COMMANDS.ADD,
        };

        const params = helpers.convertObjectToParams(articleData);
        await client.sendCommand(["XADD", STREAMS.ARTICLE_STREAM, "*", params]);

        // @FIXME: later on improve it by adding an event listener for it
        eventHandler.articleHandler(articleData);
    }

    async removeArticleOrThrow(articleId: string): Promise<void> {
        const article = await getArticleModel
            .findOne({ articleId })
            .lean();
        if (!article) {
            throw new Error("Invalid Article ID provided");
        }

        const articleData: IArticleCommand = {
            articleId,
            command: ARTICLE_COMMANDS.REMOVE,
        };

        const params = helpers.convertObjectToParams(articleData);
        await client.sendCommand(["XADD", STREAMS.ARTICLE_STREAM, "*", params]);

        // @FIXME: later on improve it by adding an event listener for it
        eventHandler.articleHandler(articleData);
    }
    
    private _generateArticleId(): string {
        return uuid();
    }
}

export default new ArticleCommandHandler();