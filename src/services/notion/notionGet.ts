/**
 * Get the child DBs from the specified "ParentDB"
 * @param databaseID - The ID of the ParentDB (expenses/incomes)
 * @param apiToken - Notion API Token
 * @returns The ID and the Title of the child databases
 */
export const getChildrenID = async (
  databaseID: string,
  apiToken: string,
): Promise<Array<string>> => {
  const url = `https://api.notion.com/v1/blocks/${databaseID}/children`;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${apiToken}`,
      "Notion-Version": "2022-06-28",
      "Content-Type": "application/json",
    },
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
export const getChildrenTitle = async (
  databaseID: string,
  apiToken: string,
) => {
  const url = `https://api.notion.com/v1/blocks/${databaseID}`;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${apiToken}`,
      "Notion-Version": "2022-06-28",
      "Content-Type": "application/json",
    },
  });

  const resJson = await res.json();
  if (resJson.type === "child_database") {
    return {
      id: databaseID,
      title: resJson.child_database.title,
    };
  }
};
