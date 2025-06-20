export interface Column {
  type: ColumnType;
  name: string;
}

type ColumnType =
  | "date"
  | "multi_select"
  | "select"
  | "number"
  | "title"
  | "rich_text";
