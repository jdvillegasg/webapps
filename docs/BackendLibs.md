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
* Use the `useQuery` hook to 

!!! example "Tanstack useQuery hook"
    ```jsx
    1
    ```

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
* Copy the `sessionManager`