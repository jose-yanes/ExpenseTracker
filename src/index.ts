import { Hono } from "hono";
import { Routes } from "./routes";
const app = new Hono();

app.route("/", Routes.notionRoutes);
export default app;
