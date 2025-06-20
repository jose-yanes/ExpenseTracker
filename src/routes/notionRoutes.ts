import { Controller } from "../controllers";
import { Hono } from "hono";
const notionRoutes = new Hono();

notionRoutes.get("/sync_db", Controller.syncDBController);

notionRoutes.get(
  "/sync_columns/:childrenId",
  Controller.syncChildrenColumnsController,
);
export default notionRoutes;
