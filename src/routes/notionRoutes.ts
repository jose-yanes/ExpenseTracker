import { Controller } from "../controllers";
import { Hono } from "hono";
const notionRoutes = new Hono();

notionRoutes.get("/sync_db", Controller.syncDBController);
notionRoutes.post("/send_map/:databaseId", Controller.saveMappingController);

export default notionRoutes;
