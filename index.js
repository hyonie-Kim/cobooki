const mongoose = require("mongoose");
const express = require("express");
const config = require("./config/key");
const app = express();
const port = 3000;
const path = require("path");
const MongoURL = config.mongoURL;

app.use(express.static("../front-end/public"));
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../front-end/views"));

// app.use(express.json());

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

app.get("/", (req, res) => {
  res.render("index");
});
app.get("/test", (req, res) => {
  res.render("test");
});
app.post("/test2", (req, res) => {
  console.log(req.body);
  res.send("결과는?");
});
app.get("/signIn", (req, res) => {
  res.render("signIn");
});
app.get("/order", (req, res) => {
  res.render("order");
});

app.all("*", (req, res) => {
  res.status(404).send("찾을 수 없는 페이지 입니다.");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
