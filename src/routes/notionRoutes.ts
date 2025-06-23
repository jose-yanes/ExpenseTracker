import { Controller } from "../controllers";
import { Hono } from "hono";
const notionRoutes = new Hono();

notionRoutes.get("/sync_db", Controller.syncDBController);
notionRoutes.post("/send_map/:databaseId", Controller.saveMappingController);
notionRoutes.get("/sync_rows/:databaseId", Controller.getRowsInfoController);
export default notionRoutes;
