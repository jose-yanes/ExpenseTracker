import { z } from "zod";

export const columnmappingSchema = z.object({
  amount: z.string().min(1, "Required Field"),
  title: z.string().min(1, "Required Field"),
  date: z.string().min(1, "Required Field"),
  category: z.string().min(1, "Required Field"),
  category_needs: z.string().min(1, "Required Field"),
  category_wants: z.string().min(1, "Required Field"),
  category_savings: z.string().min(1, "Required Field"),
  details: z.string().min(1, "Required Field"),
  subcategory: z.string(),
});

export type ColumnMapping = z.infer<typeof columnmappingSchema>;
