import {
  createKindeServerClient,
  GrantType,
  type SessionManager,
  type UserType,
} from "@kinde-oss/kinde-typescript-sdk";

import { type Context } from "hono";
import { getCookie, setCookie, deleteCookie } from "hono/cookie";
import { createFactory, createMiddleware } from "hono/factory";

// Client for authorization code flow
export const kindeClient = createKindeServerClient(
  GrantType.AUTHORIZATION_CODE,
  {
    authDomain: process.env.KINDE_DOMAIN!,
    clientId: process.env.KINDE_CLIENT_ID!,
    clientSecret: process.env.KINDE_CLIENT_SECRET!,
    redirectURL: process.env.KINDE_REDIRECT_URI!,
    logoutRedirectURL: process.env.KINDE_LOGOUT_REDIRECT_URI!,
  }
);

let store: Record<string, unknown> = {};

// Store the ID details in cookie
export const sessionManager = (c: Context): SessionManager => ({
  async getSessionItem(key: string) {
    const result = getCookie(c, key);
    return result;
  },
  async setSessionItem(key: string, value: unknown) {
    const cookieOpts = {
      httpOnly: true,
      secure: true,
      sameSite: "Lax",
    } as const;
    if (typeof value === "string") {
      setCookie(c, key, value, cookieOpts);
    } else {
      setCookie(c, key, JSON.stringify(value), cookieOpts);
    }
  },
  async removeSessionItem(key: string) {
    deleteCookie(c, key);
  },
  async destroySession() {
    ["id_token", "access_token", "user", "refresh_token"].forEach((entry) => {
      deleteCookie(c, entry);
    });
  },
});

type Env = {
  Variables: {
    user: UserType;
  };
};

// Hono Middleware function
export const getUserMiddlewareMethod = createMiddleware<Env>(
  async (c, next) => {
    //Template from Hono page
    //await next()
    //c.res.headers.set('X-Message', 'Good morning!')
    try {
      const manager = sessionManager(c);
      const isAuthenticated = await kindeClient.isAuthenticated(manager);

      if (!isAuthenticated) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const user = await kindeClient.getUserProfile(manager);
      c.set("user", user);
      await next();
    } catch (err) {
      console.error(err);
      return c.json({ error: "Unauthorized" }, 401);
    }
  }
);
