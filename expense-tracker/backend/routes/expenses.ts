import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { createExpenseSchema, setIntervalDateValidator } from "../sharedTypes";
import { getUserMiddlewareMethod } from "../kinde";
import { db } from "../db/index";
import { expensesTable, insertExpenseSchema } from "../db/schemas/expenses";
import { desc, eq, sum, and, between, sql } from "drizzle-orm";

/* Mock
export type Expense = z.infer<typeof expenseSchema>;
const fakeExpenses: Expense[] = [
  { id: 1, title: "Groceries", amount: "50" },
  { id: 2, title: "Utilities", amount: "100" },
  { id: 3, title: "Rent", amount: "1000" },
];
*/

type LastWeekExpense = {
  lastweekspent: number | null;
};

type LastBiWeekExpense = {
  lastbiweekspent: number | null;
};

type LastMonthExpense = {
  lastmonthspent: number | null;
};

// Routes here are /api/expenses, /api/expenses/total-spent, and so on
export const expensesRoute = new Hono()
  .get("/", getUserMiddlewareMethod, async (c) => {
    const user = c.var.user;
    const expenses = await db
      .select()
      .from(expensesTable)
      .where(eq(expensesTable.userId, user.id))
      .orderBy(desc(expensesTable.date))
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

    // Here, 'result' is an object having a key named 'totalSpent'
    const result = await db
      .select({ totalSpent: sum(expensesTable.amount) })
      .from(expensesTable)
      .where(eq(expensesTable.userId, c.var.user.id))
      .limit(1)
      .then((res) => res[0]);
    return c.json(result);
  })
  .get("/last-week-spent", getUserMiddlewareMethod, async (c) => {
    // Sum of the expenses of the last week
    // FROM THE DAY THE USER MAKES THE CONSULT

    const result = await db
      .select({
        lastbiweekspent: sql<number>`sum(${expensesTable.amount})`.as(
          "lastweekspent"
        ),
      })
      .from(expensesTable)
      .where(
        and(
          eq(expensesTable.userId, c.var.user.id),
          sql`${expensesTable.date} >= CURRENT_DATE - INTERVAL '7 days'`
        )
      )
      .then((res) => res[0]);

    return c.json(result);
  })
  .get("/last-biweek-spent", getUserMiddlewareMethod, async (c) => {
    // Sum of the expenses of the last 2 weeks
    // FROM THE DAY THE USER MAKES THE CONSULT

    const result = await db
      .select({
        lastbiweekspent: sql<number>`sum(${expensesTable.amount})`.as(
          "lastbiweekspent"
        ),
      })
      .from(expensesTable)
      .where(
        and(
          eq(expensesTable.userId, c.var.user.id),
          sql`${expensesTable.date} >= CURRENT_DATE - INTERVAL '15 days'`
        )
      )
      .then((res) => res[0]);

    return c.json(result);
  })
  .get("/last-month-spent", getUserMiddlewareMethod, async (c) => {
    // Sum of the expenses of the last month
    // FROM THE DAY THE USER MAKES THE CONSULT
    const result = await db
      .select({
        lastbiweekspent: sql<number>`sum(${expensesTable.amount})`.as(
          "lastmonthspent"
        ),
      })
      .from(expensesTable)
      .where(
        and(
          eq(expensesTable.userId, c.var.user.id),
          sql`${expensesTable.date} >= CURRENT_DATE - INTERVAL '30 days'`
        )
      )
      .then((res) => res[0]);

    return c.json(result);
  })
  .post(
    "/any-interval-spent",
    getUserMiddlewareMethod,
    zValidator("json", setIntervalDateValidator),
    async (c) => {
      const { myStartDate, myStopDate } = c.req.valid("json");

      console.log(myStartDate, myStopDate);

      const result = await db
        .select({ spentInInterval: sum(expensesTable.amount) })
        .from(expensesTable)
        .where(
          and(
            eq(expensesTable.userId, c.var.user.id),
            between(expensesTable.date, myStartDate, myStopDate)
          )
        ) // you can compare dates right away!! I didn't find documentation about it, but I just tried it and it works
        .then((res) => res[0]);

      return c.json(result);
    }
  )
  .get(
    "/money-spent-distribution/:groupbyndays{[1-5]+}",
    getUserMiddlewareMethod,
    async (c) => {
      const groupbyndays = Number.parseInt(c.req.param("groupbyndays"));
      const fourweeksTS = 604800 * 4 * 1000; //look for the last month
      const dayTS = 86400 * 1000;
      const today = new Intl.DateTimeFormat("en-US", {
        timeZone: "America/Bogota",
      }).format(new Date());
      const pastDate = new Date(Date.parse(today) - fourweeksTS).toISOString();

      console.log("Start Date: " + pastDate + ", End Date: " + today);

      const result = await db
        .select({ amount: expensesTable.amount, date: expensesTable.date })
        .from(expensesTable)
        .where(
          and(
            eq(expensesTable.userId, c.var.user.id),
            between(expensesTable.date, pastDate, today)
          )
        )
        .then((res) => {
          res.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));

          let newResult = [];
          let cumRes = 0;
          let rightDay = { date: res[0].date, amount: res[0].amount };
          let aux = 0;
          let cntConsecutive = 0;

          for (let i = 1; i < res.length; i += 1) {
            console.log(
              "expense [ " +
                i +
                "]: amount: " +
                res[i].amount +
                ": date: " +
                res[i].date
            );
            aux = Date.parse(rightDay.date) - Date.parse(res[i].date);
            if (aux <= dayTS * groupbyndays) {
              cntConsecutive = cntConsecutive + 1;
              if (cntConsecutive > 1) {
                cumRes = cumRes + Number(res[i].amount);
              } else {
                cumRes =
                  cumRes + Number(res[i].amount) + Number(rightDay.amount);
              }
            } else {
              if (cumRes > 0) {
                newResult.push(cumRes);
                console.log("Save: cumsum: " + cumRes);
              } else {
                newResult.push(rightDay.amount);
                console.log("Save: rightday: " + cumRes);
              }
              rightDay = res[i];
              cntConsecutive = 0;
              cumRes = 0;
            }
          }
          if (cumRes > 0) {
            newResult.push(cumRes);
            console.log("Save: cumsum: " + cumRes);
          } else {
            newResult.push(rightDay.amount);
            console.log("Save: rightday: " + cumRes);
          }
          return newResult;
        });
      return c.json({ result: result, startdate: pastDate, enddate: today });
    }
  )
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
