const express = require("express");
const app = express();
const PORT = 8080;

app.get("/", (req, res) => {
  res.status(200).send("Hello, World!");
});

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => console.log(`Express app listening on ${PORT}...`));
}

module.exports = app;
