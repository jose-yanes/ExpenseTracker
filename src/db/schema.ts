import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";

export const databasesTable = sqliteTable("databases", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  type: text("type").notNull(),
});

//Template table to test column_mapping
export const usersTable = sqliteTable("users", {
  id: int().primaryKey({ autoIncrement: true }),
  email: text("email"),
  password: text("password"),
});

export const columnMappingTable = sqliteTable("column_mapping", {
  id: int("id").primaryKey({ autoIncrement: true }),
  userId: int("user_id")
    .notNull()
    .references(() => usersTable.id),
  mapping: text("mapping", { mode: "json" }),
  databaseId: text("database_id")
    .notNull()
    .references(() => databasesTable.id),
  completed: int({ mode: "boolean" }).default(false),
  userColumns: text("user_columns", { mode: "json" }),
});

export const expensesTable = sqliteTable("expenses", {
  id: text("id").primaryKey(),
  databaseId: text("database_id")
    .notNull()
    .references(() => databasesTable.id),
  lastEdited: text("last_edited"),
  title: text("title").notNull(),
  date: text("date"),
  amount: int().notNull(),
  category: text().notNull(),
  details: text(),
  subcategory: text(),
});

export const incomesTable = sqliteTable("incomes", {
  id: text("id").primaryKey(),
  databaseId: text("database_id")
    .notNull()
    .references(() => databasesTable.id),
  title: text("title").notNull(),
  amount: int().notNull(),
});
