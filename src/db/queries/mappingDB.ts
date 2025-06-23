import { db } from "../client";
import { columnMappingTable } from "../schema";
import { eq } from "drizzle-orm";
import { AnyColumn } from "../../models/notionModels";
import { ColumnMapping } from "../../models/mappingSchema";

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

export const addUserMapping = async (
  databaseId: string,
  mapping: ColumnMapping,
) => {
  await db
    .update(columnMappingTable)
    .set({
      mapping,
      completed: true,
    })
    .where(eq(columnMappingTable.databaseId, databaseId));
};

export const getUserMapping = (databaseId: string) => {
  return db
    .select({
      mapping: columnMappingTable.mapping,
    })
    .from(columnMappingTable)
    .where(eq(columnMappingTable.databaseId, databaseId))
    .get();
};
