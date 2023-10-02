export interface IArticle {
    articleId: string;
    title?: string;
    description?: string;
    genre?: string;
    rate?: number;
}

export interface IAddArticleDTO {
    title: string;
    description: string;
    genre: string;
}

export interface IUpdateArticleDTO {
    rate: number;
    rateRecord: Array<IArticleRate>;
}

export interface IArticleRate {
    rateGotten: number;
    dateTimestamp: number;
}

export interface IArticleCommand extends IArticle {
    command: string;
}

export interface IArticleRateCommand {
    articleId: string;
    points: number;
}

export enum ARTICLE_COMMANDS {
    ADD = "ADD",
    REMOVE = "REMOVE",
};

export enum STREAMS {
    ARTICLE_STREAM = "article_stream",
    RATE_STREAM = "rate_stream",
};
