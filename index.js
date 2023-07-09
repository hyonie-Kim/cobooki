const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const {
  mainRouter,
  userRouter,
  mypageRouter,
  adminRouter,
} = require("./router");

// ejs 설정
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// session 설정
const cookieParser = require("cookie-parser");
const session = require("express-session");
const date = new Date();
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SECRET_KEY,
    name: "code_book_id",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: date.setMinutes(date.getMinutes() + 60 * 24),
    },
  })
);

// router 설정
app.use("/", mainRouter);
app.use("/user", userRouter);
app.use("/mypage", mypageRouter);
app.use("/admin", adminRouter);

app.all("*", (req, res) => {
  res.status(404).send("찾을 수 없는 페이지 입니다.");
});

// mongoose 연결
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("connecting MongoDB");
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
