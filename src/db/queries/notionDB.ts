import { db } from "../client";
import { databasesTable } from "../schema";
import { eq } from "drizzle-orm";

export const addIfNotExists = async (
  id: string,
  title: string,
  type: string,
) => {
  const existing = db
    .select()
    .from(databasesTable)
    .where(eq(databasesTable.id, id))
    .get();

  if (!existing) {
    await db.insert(databasesTable).values({
      id,
      title,
      type,
    });
  }
};
