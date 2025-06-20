import { Hono } from "hono";
import { Routes } from "./routes";
const app = new Hono();

app.route("/notion", Routes.notionRoutes);
export default app;
