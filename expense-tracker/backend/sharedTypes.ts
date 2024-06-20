import { insertExpenseSchema } from "./db/schemas/expenses";

/* Initial validator object with Zod
import { z } from "zod";
export const expenseSchema = z.object({
  id: z.number().int().positive().min(1),
  title: z
    .string()
    .min(3, { message: "Title must have at least 3 characters" })
    .max(100, { message: "Title can't have more than 100 characters" }),
  amount: z.string().regex(/^\d+(\.\d{1,2})?$/), // Positive numbers
});

export const createExpenseSchema = expenseSchema.omit({ id: true });
*/

export const createExpenseSchema = insertExpenseSchema.omit({
  userId: true,
  createdAt: true,
  id: true,
});
