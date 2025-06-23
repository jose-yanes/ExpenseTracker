import { getUserMapping } from "../../db/queries/mappingDB";

//Template file to create function that maps
//The returned rows with the app schema.
export const getMappedRows = async (databaseId: string, rowsInfo) => {
  const userMapping = await getUserMapping(databaseId)?.mapping;
  const mappedArr = [];
  for (let i = 0; i < rowsInfo.length; i++) {
    const properties = rowsInfo[i].properties;
    const formattedRow = {
      id: rowsInfo[i].id,
      lastEdited: rowsInfo[i].last_edited_time,
      amount: properties[userMapping["amount"]].number,
      date: properties[userMapping["date"]].date.start,
      category: properties[userMapping["category"]].select.name,
      subcategory: properties[userMapping["subcategory"]].multi_select[0].name,
      details: properties[userMapping["details"]].rich_text[0]?.plain_text,
      title: properties[userMapping["title"]].title[0].plain_text,
    };
    mappedArr.push(formattedRow);
  }
  return mappedArr;
};
