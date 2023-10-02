import { ARTICLE_COMMANDS, IArticle, IArticleCommand, STREAMS } from "modules/articles/article.types";
import ArticleEventHandler from "modules/articles/article.event";
import client from "config/redis.config";
import helpers from "./helpers";

const articleEventHandler = new ArticleEventHandler();

class EventHandler {
    async articleHandler(record: IArticleCommand): Promise<void> {
        await articleEventHandler.processArticle(record);
        const articles = await this._computeArticleRecord();
        await articleEventHandler.updateArticles(articles);
    }

    private async _computeArticleRecord(): Promise<IArticle[]> {
        // @FIXME: change any later
        const events: any = await client.sendCommand([
            "XREAD",
            "STREAMS",
            STREAMS.ARTICLE_STREAM,
            "0-0"
        ]);
        if (!events) {
            return [];
        }

        const [_, records] = events[0];

        let articles: Array<IArticle> = [];

        for (const record of records) {
            const [__, payload] = record;
            const data = helpers.convertParamsToObject<IArticleCommand>(payload);
            const { command, ...articleData } = data;

            switch (command) {
                case ARTICLE_COMMANDS.ADD: {
                    articles.push(articleData);
                    break;
                };
                case ARTICLE_COMMANDS.REMOVE: {
                    articles = articles
                        .filter((article) => article.articleId !== articleData.articleId);
                    break;
                };
                default: {
                    console.info("fallback");
                    break;
                }
            }
        }

        return articles;
    }
}

export default new EventHandler();