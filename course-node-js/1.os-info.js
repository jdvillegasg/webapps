/*eslint-disable*/
const os = require("node:os");
console.log("OS name: " + os.platform());
console.log("OS version: " + os.release());
console.log("OS Arch: " + os.arch());
console.log("OS # CPUs: " + os.cpus().length);
console.log("OS Free memory: " + os.freemem() / 1024 / 1024);
console.log("OS Total memory: " + os.totalmem() / 1024 / 1024);
console.log("OS Uptime: " + os.uptime() / 60 / 60);
