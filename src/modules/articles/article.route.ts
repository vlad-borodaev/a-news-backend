import express from "express";
import articleController from "./article.controller";

const router = express.Router();

router.get("/", articleController.getArticles);
router.get("/article/:id", articleController.getArticle);

router.post("/article", articleController.addArticle);
router.delete("/article/:id", articleController.removeArticle);

export default router;
