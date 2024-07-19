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

export const foodTable = pgTable(
  "food",
  {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    carbs: numeric("carbs", { precision: 12, scale: 2 }).notNull(),
    fat: numeric("fat", { precision: 12, scale: 2 }).notNull(),
    protein: numeric("protein", { precision: 12, scale: 2 }).notNull(),
    calories: numeric("calories", { precision: 12, scale: 2 }).notNull(),
    sodium: numeric("sodium", { precision: 12, scale: 2 }).notNull(),
    fiber: numeric("fiber", { precision: 12, scale: 2 }).notNull(),
    vitaA: numeric("vitaA", { precision: 12, scale: 2 }).notNull(),
    vitaC: numeric("vitaC", { precision: 12, scale: 2 }).notNull(),
    folic: numeric("folic", { precision: 12, scale: 2 }).notNull(),
    calcium: numeric("calcium", { precision: 12, scale: 2 }).notNull(),
    iron: numeric("iron", { precision: 12, scale: 2 }).notNull(),
    price: numeric("price", { precision: 12, scale: 2 }).notNull(),
  }
  /*
  // Create indexes here
  (expenses) => {
    return {
      userIdIndex: index("name_idx").on(expenses.userId),
    };
  }
    */
);

export const insertFoodSchema = createInsertSchema(foodTable, {
  title: z
    .string()
    .min(3, { message: "Title must have at least 3 characters" }),
  carbs: z.string().regex(/^\d+(\.\d{1,2})?$/), // Positive numbers
  fat: z.string().regex(/^\d+(\.\d{1,2})?$/), // Positive numbers
  protein: z.string().regex(/^\d+(\.\d{1,2})?$/), // Positive numbers
  calories: z.string().regex(/^\d+(\.\d{1,2})?$/), // Positive numbers
  sodium: z.string().regex(/^\d+(\.\d{1,2})?$/), // Positive numbers
  fiber: z.string().regex(/^\d+(\.\d{1,2})?$/), // Positive numbers
  vitaA: z.string().regex(/^\d+(\.\d{1,2})?$/), // Positive numbers
  vitaC: z.string().regex(/^\d+(\.\d{1,2})?$/), // Positive numbers
  folic: z.string().regex(/^\d+(\.\d{1,2})?$/), // Positive numbers
  calcium: z.string().regex(/^\d+(\.\d{1,2})?$/), // Positive numbers
  iron: z.string().regex(/^\d+(\.\d{1,2})?$/), // Positive numbers
  price: z.string().regex(/^\d+(\.\d{1,2})?$/), // Positive numbers
});
// Schema for selecting a user - can be used to validate API responses
export const selectFoodSchema = createSelectSchema(foodTable);
