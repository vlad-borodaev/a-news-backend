import Joi from "joi";
import { IAddArticleDTO } from "./article.types";

export const addArticleValidator = (requestData: IAddArticleDTO): void => {
    const schema = Joi.object<IAddArticleDTO>().keys({
        title: Joi.string().required(),
        description: Joi.string().required(),
        genre: Joi.string().required(),
    });

    const validationResult: Joi.ValidationResult = schema.validate(requestData);

    if (validationResult?.error) {
        throw new Error(validationResult.error.message);
    }
};
