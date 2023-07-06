const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");

const { User } = require("./Model/user");

app.use(express.static("public")); //public 폴더 안에 있는 CSS,IMG 적용시키는 함수
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "../front-end/views"));

// app.use(express.json());

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });
app.use("/", require("./router/user"));

app.all("*", (req, res) => {
  res.status(404).send("찾을 수 없는 페이지 입니다.");
});

// mongoose
//   .connect(MongoURL)
//   .then(() => {
//     console.log("connecting MongoDB");
//     app.listen(port, () => {
//       console.log(`Example app listening on port ${port}`);
//     });
//   })
//   .catch((err) => {
//     console.log(err);
//   });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
