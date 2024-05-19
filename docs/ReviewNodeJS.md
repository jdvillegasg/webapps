# Node.js environment
## Good practices
* When fetching a page which returns json objects, create a folder named `mocks` under the `src` folder of the project, and create two types of `.json` files:
    1. One that serves as an example of a typical response.
    2. One that serves as an example of a not available response.

# Bun runtime

## Package manager

You can use Bun as a package manager like `npm` or `yarn` or so on.

For example, to install `Hono`:

```sh
    bun install hono
```

## HTTP server

!!! example "Start a Bun Server"
    ```js
    Bun.serve({
    //port: 8080, // defaults to $BUN_PORT, $PORT, $NODE_PORT otherwise 3000
    //hostname: "mydomain.com", // defaults to "0.0.0.0"
    fetch(req) {
        return new Response("El server de Bun anda corriendo");
    },
    });
    ```
