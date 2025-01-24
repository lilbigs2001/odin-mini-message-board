const express = require("express");
const app = express();
const path = require("path");

const PORT = 8080;

const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date(),
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date(),
  },
];

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index", { messages });
});

app.get("/new", (req, res) => {
  res.status(200).send();
});

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => console.log(`Express app listening on ${PORT}...`));
}

module.exports = { app, messages };
