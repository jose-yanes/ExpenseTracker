import { Notion } from "../services/notion/";
import { Map } from "../services/mapping";
import { addIfNotExists } from "../db/queries/notionDB";
import {
  addMappingIfNotExists,
  addUserColumns,
  addUserMapping,
} from "../db/queries/mappingDB";
import { addExpense } from "../db/queries/expenses";
import { Context } from "hono";
import { columnmappingSchema } from "../models/mappingSchema";

const EXPENSE_DB = process.env.EXPENSE_DB;
const INCOME_DB = process.env.INCOME_DB;
const USER_ID = process.env.USER_ID;

export const syncDBController = async (c: Context) => {
  const expenseChildrens = await Notion.getChildrenID(EXPENSE_DB);
  const incomeChildrens = await Notion.getChildrenID(INCOME_DB);
  for (let i = 0; i < expenseChildrens.length; i++) {
    // ASUMO que hay la misma cantidad de expenses que de incomes ya que deberia haber
    // una por cada mes trackeado.
    const expenseDb = await Notion.getChildrenTitle(expenseChildrens[i]);
    const incomeDb = await Notion.getChildrenTitle(incomeChildrens[i]);

    addIfNotExists(expenseDb.id, expenseDb?.title, "expense");
    addIfNotExists(incomeDb.id, incomeDb?.title, "income");

    addMappingIfNotExists(USER_ID, expenseDb.id);
    addMappingIfNotExists(USER_ID, incomeDb.id);

    const expenseChildrenInfo = await Notion.getColumnInfo(expenseChildrens[i]);
    const incomeChildrenInfo = await Notion.getColumnInfo(incomeChildrens[i]);
    addUserColumns(expenseDb.id, expenseChildrenInfo);
    addUserColumns(incomeDb.id, incomeChildrenInfo);
  }

  c.status(200);
  return c.json({
    msg: "Sync Completed",
  });
};

export const saveMappingController = async (c: Context) => {
  const databaseId = c.req.param("databaseId");
  const body = await c.req.json();
  const result = columnmappingSchema.safeParse(body);
  console.log(result);
  if (!result.success) {
    return c.json(
      {
        error: "Invalid Mapping",
        details: result.error.format(),
      },
      400,
    );
  }

  const mapping = result.data;
  addUserMapping(databaseId, mapping);
  return c.json({
    ok: true,
  });
};

export const getRowsInfoController = async (c: Context) => {
  const databaseId = c.req.param("databaseId");
  const rowsInfo = await Notion.getRowsInfo(databaseId);
  const mappedRows = await Map.getMappedRows(databaseId, rowsInfo);
  for (let i = 0; i < mappedRows.length; i++) {
    addExpense(mappedRows[i], databaseId);
  }
  return c.json({
    rows: rowsInfo,
  });
};
