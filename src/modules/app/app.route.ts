import express, { Router } from "express";

import articleRoute from "../articles/article.route";

interface IRoute {
    path: string;
    route: Router;
}

const router = express.Router();

const ROUTES: IRoute[] = [
    {
        path: "/articles",
        route: articleRoute,
    },
];

for (let route of ROUTES) {
    router.use(route.path, route.route);
}

export default router;