const fs = require("fs");

module.exports = (filename, fn) =>
  fs.readFile(filename, (_, buffer) => {
    console.log(fn(buffer.toString()));
  });
