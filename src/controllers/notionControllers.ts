import { Notion } from "../services/notion/";
import { addIfNotExists } from "../db/queries/notionDB";

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
    const expenseDb = await Notion.getChildrenTitle(
      expenseChildrens[i],
      apiToken,
    );
    const incomeDb = await Notion.getChildrenTitle(
      incomeChildrens[i],
      apiToken,
    );

    addIfNotExists(expenseDb?.id, expenseDb?.title, "expense");
    addIfNotExists(incomeDb?.id, incomeDb?.title, "income");
  }
};
