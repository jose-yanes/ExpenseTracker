import { db } from "../client";
import { columnMappingTable } from "../schema";
import { eq } from "drizzle-orm";
import { AnyColumn } from "../../models/notionModels";

export const addMappingIfNotExists = async (
  userId: number,
  databaseId: string,
) => {
  const existing = db
    .select()
    .from(columnMappingTable)
    .where(eq(columnMappingTable.databaseId, databaseId))
    .get();

  if (!existing) {
    await db.insert(columnMappingTable).values({
      userId,
      databaseId,
    });
  }
};
export const addUserColumns = async (
  databaseId: string,
  userColumns: AnyColumn[],
) => {
  await db
    .update(columnMappingTable)
    .set({
      userColumns,
    })
    .where(eq(columnMappingTable.databaseId, databaseId));
};
