import { Controller } from "../controllers";
import { Hono } from "hono";

const EXPENSE_DB = process.env.EXPENSE_DB;
const INCOME_DB = process.env.INCOME_DB;
const NOTION_API = process.env.NOTION_API;

const notionRoutes = new Hono();

notionRoutes.get("/sync_db", async (c) => {
  await Controller.syncDBController(EXPENSE_DB, INCOME_DB, NOTION_API);
  c.status(200);
  return c.json({
    msg: "Syncronization completed",
  });
});

export default notionRoutes;
