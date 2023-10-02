import { ARTICLE_COMMANDS, IArticle, IArticleCommand } from "./article.types";
import getArticleModel from "./models/get-article";
import getArticlesModel from "./models/get-articles";

class ArticleEventHanlder {
    async processArticle(record: IArticleCommand): Promise<void> {
        const {
            articleId,
            title,
            description,
            genre,
        } = record;

        switch (record.command) {
            case ARTICLE_COMMANDS.ADD: {
                await new getArticleModel({
                    articleId,
                    title,
                    description,
                    genre,
                }).save();
                break;
            };
            case ARTICLE_COMMANDS.REMOVE: {
                await getArticleModel.deleteOne({ articleId });
                break;
            }
            default: {
                console.info("fallback");
                break;
            }
        }
    }

    async updateArticles(articles: Array<IArticle>): Promise<void> {
        const allArticles = await getArticlesModel.findOne({});
        if (!allArticles) {
            await new getArticlesModel({ articles }).save();
            return;
        }

        allArticles.articles = articles;
        await allArticles.save();
    }
}

export default ArticleEventHanlder;