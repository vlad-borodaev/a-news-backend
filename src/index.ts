import app from "./application";

import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.APP_PORT || 3000;

app.listen(PORT, () => {
    console.info(`Server is listening on port ${PORT}`);
});

process.on("uncaughtException", (err: unknown) => {
    console.error((err as any)?.message);
    process.exit(1);
});

process.on("unhandledRejection", (err: unknown) => {
    console.error((err as any)?.message);
    process.exit(1);
});