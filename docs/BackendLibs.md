# Hono

## Installation

```sh
    bun install hono
```

## Usage

Create separate file in directory with:

```js
    import { Hono } from 'hono'
    const app = new Hono()

    app.get('/test', (c) => c.text('Hono!'))

    export default app
```

The object `c` is called the Context object, and contains all the HTTP information to be goten or posted.


Implement the routes of your choice (i.e. `/test` in the example above).

Then in your `Bun` server:
```js
    Bun.serve({
        fetch: app.fetch,
    });
```

## Middleware

In [Hono Helpers Middleware](https://hono.dev/helpers/factory#createfactory) there are some helper methods to create a Middleware.

In the file where the `createKindeServerClient()` method and the `sessionManager` implementation are defined, add the following helper methods:

!!! example "Hono Middleware with helper methods"
    ```jsx
    import { createFactory, createMiddleware } from 'hono/factory'

    type Env = {
        Variables: {
          user: string
        }
    }

    const messageMiddleware = createMiddleware<Env>(async (c, next) => {
        // example code
        await next()
        // example code
    })
    ```

We can call the created middleware into our route:

!!! example "Call middleware from Hono routes (endpoints)"
    ```jsx
    .get("/myendpoint", messageMiddleware, async (c) => {
        //Example code here
    })
    ```

And if we set variables in the middleware, we can retrieve them in the endpoint. For example:

!!! example "Create a varable in middleware"
    ```jsx
    export const getUserMiddlewareMethod = createMiddleware<Env>(
    async (c, next) => {
    //session manager implementation
    const user = await kindeClient.getUserProfile(manager);
    
    //THE VARIABLE "USER" IS ACCESIBLE THROUGH THE CONTEXT MANAGER "c" 
    c.set("user", user);
    await next();
    //...
    ```

!!! example "Retrieve variable"
    ```jsx
    .get("/myendpoint", messageMiddleware, async (c) => {
        const user = c.var.user
    })
    ```

### Logger
Logs the following details for each request:

* Incoming Request: HTTP method, request path, and incoming request.
* Outgoing Response:HTTP method, request path, response status code, and request/response times.
* Status Code Coloring: Response status codes are color-coded for better visibility and quick identification of status categories. Different status code categories are represented by different colors.
* Elapsed Time: time taken for the request/response cycle is logged in a human-readable format, either in milliseconds (ms) or seconds (s).

## RPC

Allows to set types in both the backend and fronted.

# Zod 

We can create a Zod validation schema by using `z`:

!!! example "Zod validation schema"
    ```jsx
    import { z } from "zod"
    const schema = z.object(
        {
            key1: z.string.min(3).max(50), // z types
            key2: z.number().int().positive()
        }
    )


# Tanstack (former React Query)

Asynchronous state management for TS/JS and React (among others). 

```sh
bun add @tanstack/react-query
```

Follow the instructions in the `Quick start` page of the Tanstack Query documentation.

* Wrap the frontend app in a `QueryClientProvider`.
* Use the `useQuery` hook:

!!! example "Tanstack useQuery hook"
    ```jsx
    const { error, isPending, data } = useQuery(queryOptions);
    ```
Among the `queryOptions` it is important to distinguish:

* `queryKey`: name to identify the query, related with the name of the function
* `queryFn`: function to be called
* `staleTime`: if set to `Infinity`, the moment one query uses the `queryOptions`, the result will be cached until the stored info is manually invalidated or the user refreshes the page (i.e. when the user login or logout).

!!! example "Example of queryOptions"
    ```jsx
    import { queryOptions } from "@tanstack/react-query

    const userQueryOpts = queryOptions({
        queryKey: ["get-current-user"],
        queryFn: getCurrentUser,
        staleTime:Infinity
    });
    ```

!!! success "Note on useQuery hook"
    The `useQuery` hook *can only be used within a component* as any React hook. If developer requires access to the query client outside a component, it should be passed as an argument to the `createRouter` method identified with the key `context`.

# Tanstack Router

Tanstack for file-based routing.

```sh
bun install @tanstack/react-router
```

and Vite plugihn

```sh
bun install --save-dev @tanstack/router-vite-plugin @tanstack/router-devtools
```

Follow the instructions in the `Quick start` page of the Tanstack Router documentation:

* Cofigure the Vite Plugin
* Create the `src/routes/__root.tsx`, `src/routes/index.tsx` and `src/routes/about.tsx`, with the template described in the Tanstack Router `Quickstart` page.
* Modify the `src/main.tsx` file

??? example "Loader Tanstack Router"
    ```jsx
    export const Route = createFileRoute("/expenses")({
        component: Expenses,
        loader:
    });
    ```
Load in your content before the actual page is seen (people sees a loading state before the actual page).

## Authenticated routes

We can restrict user access to certain routes if the user is not authenticated.

We can create a new route where all the authentication logic is present, and make use of it in other routes. The new route is not itself a frontend page, but a step into the actual route the user might want to go.

When using the `createFileRoute` method, the `beforeLoad` key property can be used to execute something before the actual route (called by the `component` key property) or any of the child routes.

!!! example "Authenticated routes in file _authenticated.tsx"
    ```jsx
    const Route = createFileRoute({
        beforeLoad: () => {
            // some logic
            return { user: { name: Julian}}
        },
        component: MyComponent
    })
    ```

We then have to place the routes we want to use the authenticated logic into a folder called as the file having the authentication logic (i.e.. if the file is named `_authenticated.tsx` as in the example above, our folder should be named `_authenticated` as well).

# Tanstack Form

```sh
bun add i @tanstack/react-form
```
# Login authentication

## Kinde 

Auth and user management. This functionality is better implemented in the backend than in the frontend.

* Sign up and log in
* When asked create a new business
* Choose the Backend > Node.js 
* Choose Email and Google (or as many social authentication services you want)

Don't have an SDK to work with Bun or Hono, but you can follow the TypeScript SDK docs.

* Install `bun install @kinde-oss/kinde-typescript-sdk`
* Copy the `kindeClient` code for NodeJS
* Add the routes as shown in the TypeSript SDK docs for NodeJS, but replace the `express` syntax with the `Hono` syntax.
* Create a `.env` file with the details of your Kinde App:
    * KINDE_DOMAIN
    * KINDE_CLIENT_ID
    * KINDE_CLIENT_SECRET
    * KINDE_REDIRECT_URI
    * KINDE_LOGOUT_REDIRECT_URI
* Copy the `sessionManager`
* Go to the `Callback URLs` section in your Kinde App dashboard, and make sure that the URLs are correct:

!!! success "Example Callback URL section in Kinde"
    ```jsx
    //URL for callback and development
    http://localhost:5173/api/callback
    ```

### Kinde notes

* Kinde does not provide an opinion on how the developer stores the session details: it gives a token that identifies or authenticates an user.
* When login, if the Session Manager stores the authentication info in cookies, the auth info will be stored in the browser cookies until the user logs out.