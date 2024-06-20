import { hc } from "hono/client";
import { type ApiRoutes } from "@backend/app";
import { queryOptions } from "@tanstack/react-query";

// The route is / because they are in the same origin
const client = hc<ApiRoutes>("/");

export const api = client.api;

async function getCurrentUser() {
  const result = await api.checkme.$get();
  if (!result.ok) throw new Error("User not found");
  const data = await result.json();
  return data;
}

const getAllExpenses = async () => {
  //await new Promise((resolve) => setTimeout(resolve, 3000));
  const result = await api.expenses.$get();
  if (!result.ok) throw new Error("Expense not found");
  const data = await result.json();
  return data;
};

export const userQueryOpts = queryOptions({
  queryKey: ["get-curent-user"],
  queryFn: getCurrentUser,
  staleTime: Infinity,
});

export const getAllExpensesOpts = queryOptions({
  queryKey: ["get-all-expenses"],
  queryFn: getAllExpenses,
});
