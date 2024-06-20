import {
  text,
  numeric,
  pgTable,
  serial,
  index,
  timestamp,
  pgEnum,
  date,
} from "drizzle-orm/pg-core";

import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const categoryValues = [
  "Food",
  "Goods",
  "Entertainment",
  "Transport",
  "Rent",
  "Training",
  "Exercise",
] as const;

export const categoryEnum = pgEnum("mood", categoryValues);
export const categoryZodType = z.enum(categoryValues);
export type Category = z.infer<typeof categoryZodType>;

export const expensesTable = pgTable(
  "expenses",
  {
    id: serial("id").primaryKey(),
    userId: text("user_id").notNull(),
    title: text("title").notNull(),
    amount: numeric("amount", { precision: 12, scale: 2 }).notNull(),
    category: categoryEnum("category"),
    date: date("date").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
  },
  // Create indexes here
  (expenses) => {
    return {
      userIdIndex: index("name_idx").on(expenses.userId),
    };
  }
);

// Schema for inserting a user - can be used to validate API requests
export const insertExpenseSchema = createInsertSchema(expensesTable, {
  title: z
    .string()
    .min(3, { message: "Title must have at least 3 characters" }),
  amount: z.string().regex(/^\d+(\.\d{1,2})?$/), // Positive numbers
  category: categoryZodType,
});
// Schema for selecting a user - can be used to validate API responses
export const selectExpenseSchema = createSelectSchema(expensesTable);
