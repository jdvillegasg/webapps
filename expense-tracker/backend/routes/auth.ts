import { Hono } from "hono";
import { kindeClient, sessionManager } from "../kinde";
import { getUserMiddlewareMethod } from "../kinde";

// Routes here are /api/login, /api/register, and so on
export const authRoute = new Hono()
  .get("/login", async (c) => {
    const loginUrl = await kindeClient.login(sessionManager(c));
    return c.redirect(loginUrl.toString());
  })
  .get("/register", async (c) => {
    const registerUrl = await kindeClient.register(sessionManager(c));
    return c.redirect(registerUrl.toString());
  })
  .get("/callback", async (c) => {
    // get called every time the user login or register
    const url = new URL(c.req.url);
    console.log("Before await successful in callback after login");
    await kindeClient.handleRedirectToApp(sessionManager(c), url);
    console.log("Await successful in callback after login");
    return c.redirect("/");
  })
  .get("/logout", async (c) => {
    // get called when the user logout
    const logoutUrl = await kindeClient.logout(sessionManager(c));
    return c.redirect(logoutUrl.toString());
  })
  .get("/checkme", getUserMiddlewareMethod, async (c) => {
    const user = c.var.user;
    return c.json({ user });
  });
