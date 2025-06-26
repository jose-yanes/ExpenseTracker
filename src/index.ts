import { Hono } from "hono";
import { timeout } from "hono/timeout";
import { logger } from "hono/logger";
import { Routes } from "./routes";
const app = new Hono();

app.use("*", logger());
app.use("/notion/sync_db", timeout(20000));
app.route("/notion", Routes.notionRoutes);
export default app;
