import express, { Application, Request, Response } from "express";
import cors from "cors";

import dotenv from "dotenv";
dotenv.config();

import "@config/mongoose.config";
import "@config/redis.config";

import AppRoutes from "@modules/app/app.route";

const app: Application = express();

const BASE_URL = process.env.BASE_URL || "/api/v1";

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (_req: Request, resp: Response) => {
    resp.status(200).send({
        data: "Hi Test App!"
    });
});

app.use(BASE_URL, AppRoutes);

export default app;