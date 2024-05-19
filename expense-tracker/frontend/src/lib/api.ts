import { hc } from "hono/client";
import { type ApiRoutes } from "@backend/app";

// The route is / because they are in the same origin
const client = hc<ApiRoutes>("/");

export const api = client.api;
