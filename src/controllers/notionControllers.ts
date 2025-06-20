import { Notion } from "../services/notion/";
import { addIfNotExists } from "../db/queries/notionDB";
import { Context } from "hono";

const EXPENSE_DB = process.env.EXPENSE_DB;
const INCOME_DB = process.env.INCOME_DB;

export const syncDBController = async (c: Context) => {
  const expenseChildrens = await Notion.getChildrenID(EXPENSE_DB);
  const incomeChildrens = await Notion.getChildrenID(INCOME_DB);
  for (let i = 0; i < expenseChildrens.length; i++) {
    // ASUMO que hay la misma cantidad de expenses que de incomes ya que deberia haber
    // una por cada mes trackeado.
    const expenseDb = await Notion.getChildrenTitle(expenseChildrens[i]);
    const incomeDb = await Notion.getChildrenTitle(incomeChildrens[i]);

    addIfNotExists(expenseDb?.id, expenseDb?.title, "expense");
    addIfNotExists(incomeDb?.id, incomeDb?.title, "income");
  }

  c.status(200);
  return c.json({
    msg: "Sync Completed",
  });
};

export const syncChildrenColumnsController = async (c: Context) => {
  const childrenId = c.req.param("childrenId");
  const columnsRetrieved = await Notion.getColumnInfo(childrenId);

  c.status(200);
  return c.json({
    msg: columnsRetrieved,
  });
};
