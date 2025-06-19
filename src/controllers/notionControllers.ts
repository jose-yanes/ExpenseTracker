import { Notion } from "../services/notion/";

export const syncDBController = async (
  expenseID: string,
  incomeID: string,
  apiToken: string,
) => {
  const expenseChildrens = await Notion.getChildrenID(expenseID, apiToken);
  const incomeChildrens = await Notion.getChildrenID(incomeID, apiToken);
  // Esto deberia devolver un objeto { childrenID" : "Children Title"}
  //
  for (let i = 0; i < expenseChildrens.length; i++) {
    // ASUMO que hay la misma cantidad de expenses que de incomes ya que deberia haber
    // una por cada mes trackeado.
    console.log(await Notion.getChildrenTitle(expenseChildrens[i], apiToken));
    console.log(await Notion.getChildrenTitle(incomeChildrens[i], apiToken));
  }
};
