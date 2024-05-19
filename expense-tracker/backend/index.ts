import app from "./app";

//const port = process.env.PORT || 3000;

const server = Bun.serve({
  port: process.env.PORT || 3000,
  //hostname: "mydomain.com", // defaults to "0.0.0.0"
  fetch: app.fetch,
});

console.log("Server running in port: " + server.port);
