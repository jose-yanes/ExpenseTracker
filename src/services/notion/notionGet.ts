import { AnyColumn } from "../../models/notionModels";

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
): Promise<Array<AnyColumn>> => {
  const url = `https://api.notion.com/v1/databases/${childrenId}`;
  const res = await fetch(url, {
    headers: Headers,
  });
  const resJson = await res.json();

  const columnArr: Array<AnyColumn> = [];
  for (const key in resJson.properties) {
    const property = resJson.properties[key];
    let column: AnyColumn;
    if (property.type === "select" || property.type === "multi_select") {
      column = {
        type: property.type,
        name: property.name,
        options: property[property.type].options,
      };
    } else {
      column = {
        type: property.type,
        name: property.name,
      };
    }
    columnArr.push(column);
  }

  return columnArr;
};

export const getRowsInfo = async (databaseId: string): Promise<Array<Row>> => {
  const url = `https://api.notion.com/v1/databases/${databaseId}/query`;
  console.log(`Url: ${url}`);
  const res = await fetch(url, {
    method: "POST",
    headers: Headers,
  });

  const resJson = await res.json();

  return resJson.results;
};
