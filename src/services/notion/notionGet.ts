import { Column } from "../../models/notionModels";

const Headers = {
  Authorization: `Bearer ${process.env.NOTION_API}`,
  "Notion-Version": "2022-06-28",
  "Content-Type": "application/json",
};

/**
 * Get the child DBs from the specified "ParentDB"
 * @param databaseID - The ID of the ParentDB (expenses/incomes)
 * @param apiToken - Notion API Token
 * @returns An Array with all the "Child DBs" from the "ParentDB"
 */
export const getChildrenID = async (
  databaseID: string,
): Promise<Array<string>> => {
  const url = `https://api.notion.com/v1/blocks/${databaseID}/children`;

  const res = await fetch(url, {
    headers: Headers,
  });

  const resJson = await res.json();

  const idArr: string[] = [];
  for (let i = 0; i < resJson.results.length; i++) {
    if (resJson.results[i].type === "child_database") {
      idArr.push(resJson.results[i].id);
    }
  }
  return idArr;
};
/**
 * Returns the title of child DBs from the specified "ID"
 * @param databaseID - The ID of the Child DB
 * @param apiToken - Notion API Token
 * @returns An Object with keys {"child id" : "title"}
 */
export const getChildrenTitle = async (databaseID: string) => {
  const url = `https://api.notion.com/v1/blocks/${databaseID}`;
  const res = await fetch(url, {
    headers: Headers,
  });

  const resJson = await res.json();
  if (resJson.type === "child_database") {
    return {
      id: databaseID,
      title: resJson.child_database.title,
    };
  }
};

export const getColumnInfo = async (
  childrenId: string,
): Promise<Array<Column>> => {
  const url = `https://api.notion.com/v1/databases/${childrenId}`;
  const res = await fetch(url, {
    headers: Headers,
  });
  const resJson = await res.json();

  const columnArr: Array<Column> = [];
  for (const key in resJson.properties) {
    const column: Column = {
      type: resJson.properties[key].type,
      name: resJson.properties[key].name,
    };

    columnArr.push(column);
  }

  console.log(columnArr);

  return columnArr;
};
