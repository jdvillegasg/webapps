/*eslint-disable*/
const fs = require("node:fs");
const fsp = require("node:fs/promises");

const stats = fs.statSync("./file.txt");
//console.log(stats.isFile(), stats.isDirectory(), stats.size);

const textfile = fs.readFileSync("./file.txt", "utf-8");
//console.log(textfile);

// Async fs read
fs.readFile("./file.txt", "utf-8", (err, data) => {
  console.log(data + ": callback");
});
//console.log("While reading file: 1");

fsp
  .readFile("./file.txt", "utf-8")
  .then((txt) => console.log(txt + ": promise"));
console.log("While reading file: promise");

// Async await with Inmediately invoked Function Expresion (IFE)
(async () => {
  const afile = await fsp.readFile("./file.txt", "utf-8");
  console.log(afile + ": async");
  console.log("After reading: async await");
})();

let outsideVar;
Promise.all([
  fsp.readFile("./file.txt", "utf-8"),
  fsp.readFile("./file2.txt", "utf-8"),
]).then(([ft, st]) => {
  console.log(ft + ": promise all first text");
  console.log(st + ": promise all second text");
  outsideVar = ft;
  console.log(outsideVar + ": outsideVar inside promise all");
});

console.log(outsideVar + ": outsideVar");
