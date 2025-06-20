import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const databasesTable = sqliteTable("databases", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  type: text("type").notNull(),
});
