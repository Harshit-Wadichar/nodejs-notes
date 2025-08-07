const express = require("express");
const fs = require("fs");
const zlib = require("zlib");
 
fs.createReadStream("./sample.txt").pipe(
  zlib.createGzip().pipe(fs.createWriteStream("./sample.zip"))
);

const app = express();
const PORT = 8000;

app.get("/", (req, res) => {
  const stream = fs.createReadStream("./sample.txt", "utf-8");
  stream.on("data", (chunk) => {
    return res.write(chunk);
  });
  stream.on("end", () => {
    return res.end();
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});