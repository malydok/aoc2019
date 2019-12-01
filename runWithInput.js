const fs = require("fs");

module.exports = fn =>
  fs.readFile("input.txt", (_, buffer) => {
    const data = buffer.toString().split("\r\n");
    console.log(fn(data));
  });
