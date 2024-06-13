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

export const userQueryOpts = queryOptions({
  queryKey: ["get-curent-user"],
  queryFn: getCurrentUser,
  staleTime: Infinity,
});
