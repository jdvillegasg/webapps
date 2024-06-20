import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { createExpenseSchema } from "../sharedTypes";
import { getUserMiddlewareMethod } from "../kinde";
import { db } from "../db/index";
import { expensesTable, insertExpenseSchema } from "../db/schemas/expenses";
import { desc, eq, sum, and } from "drizzle-orm";

/* Mock
export type Expense = z.infer<typeof expenseSchema>;
const fakeExpenses: Expense[] = [
  { id: 1, title: "Groceries", amount: "50" },
  { id: 2, title: "Utilities", amount: "100" },
  { id: 3, title: "Rent", amount: "1000" },
];
*/

// Routes here are /api/expenses, /api/expenses/total-spent, and so on
export const expensesRoute = new Hono()
  .get("/", getUserMiddlewareMethod, async (c) => {
    const user = c.var.user;
    const expenses = await db
      .select()
      .from(expensesTable)
      .where(eq(expensesTable.userId, user.id))
      .orderBy(desc(expensesTable.createdAt))
      .limit(100);
    return c.json({ expenses: expenses });
  })
  .get("/total-spent", getUserMiddlewareMethod, async (c) => {
    /* when using the mock
    await new Promise((resolve, reject) => setTimeout(resolve, 2000));
    const totalSpent = fakeExpenses.reduce(
      (sum, expense) => sum + +expense.amount,
      0
    );
    */
    const result = await db
      .select({ totalSpent: sum(expensesTable.amount) })
      .from(expensesTable)
      .where(eq(expensesTable.userId, c.var.user.id))
      .limit(1)
      .then((res) => res[0]);
    return c.json(result);
  })
  .post(
    "/",
    getUserMiddlewareMethod,
    zValidator("json", createExpenseSchema),
    async (c) => {
      const expense = await c.req.valid("json");
      console.log(expense);
      // Ultimate validated object, since it includes the userId property to be inserted in the db
      const furtherValidatedExpense = insertExpenseSchema.parse({
        ...expense,
        userId: c.var.user.id,
      });

      // The db always return an array, whether it is an actual array or there is only one element
      // since we know, the insert operation only inserts one expense at a time, we can just get the first entry of the array
      const result = await db
        .insert(expensesTable)
        .values(furtherValidatedExpense)
        .returning()
        .then((res) => res[0]); // this will return only the first entry

      //fakeExpenses.push({ ...expense, id: fakeExpenses.length + 1 });

      c.status(201);
      return c.json(result);
    }
  )
  // Dynamic Path with Regex validation
  .get("/:id{[0-9]+}", getUserMiddlewareMethod, async (c) => {
    const id = Number.parseInt(c.req.param("id"));
    /* code for the mock
    const expense = fakeExpenses.find((entry) => entry.id === id);
    */

    const user = c.var.user;
    const expense = await db
      .select()
      .from(expensesTable)
      .where(and(eq(expensesTable.userId, user.id), eq(expensesTable.id, id)))
      .then((res) => res[0]);

    if (!expense) {
      return c.notFound();
    }

    return c.json({ expense });
  })
  .delete("/:id{[0-9]+}", getUserMiddlewareMethod, async (c) => {
    const id = Number.parseInt(c.req.param("id"));

    /* mock code
    const idx = fakeExpenses.findIndex((entry) => entry.id === id);
    */

    const expense = await db
      .delete(expensesTable)
      .where(
        and(eq(expensesTable.userId, c.var.user.id), eq(expensesTable.id, id))
      )
      .returning()
      .then((res) => res[0]);

    if (!expense) {
      return c.notFound();
    }

    /* mock code
    const deletedExpense = fakeExpenses.splice(idx, 1)[0];
    */

    return c.json({ expense });
  });
