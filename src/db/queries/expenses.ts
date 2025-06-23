import { db } from "../client";
import { expensesTable } from "../schema";

export const addExpense = async (mappedRow, databaseId: string) => {
  await db.insert(expensesTable).values({
    id: mappedRow.id,
    databaseId,
    lastEdited: mappedRow.lastEdited,
    title: mappedRow.title,
    date: mappedRow.date,
    amount: mappedRow.amount,
    category: mappedRow.category,
    details: mappedRow.details,
    subcategory: mappedRow.subcategory,
  });
};
