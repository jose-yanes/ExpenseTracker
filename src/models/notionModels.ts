export interface Column {
  type: ColumnType;
  name: string;
}

export interface ColumnSelect extends Column {
  type: "select" | "multi_select";
  options: string[];
}

export type AnyColumn = Column | ColumnSelect;

type ColumnType =
  | "date"
  | "multi_select"
  | "select"
  | "number"
  | "title"
  | "rich_text";
