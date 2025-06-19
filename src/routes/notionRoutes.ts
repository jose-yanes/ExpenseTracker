import { Controller } from "../controllers";
import { Hono } from "hono";

const EXPENSE_DB = process.env.EXPENSE_DB;
const INCOME_DB = process.env.INCOME_DB;
const NOTION_API = process.env.NOTION_API;

const notionRoutes = new Hono();

notionRoutes.get("/", (c) => {
  Controller.syncDBController(EXPENSE_DB, INCOME_DB, NOTION_API);
  return c.text("HOLA");
});
export default notionRoutes;
