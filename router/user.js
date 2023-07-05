var router = require("express").Router();
const { User } = require("../Model/user");

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/signIn", (req, res) => {
  res.render("signIn");
});
router.get("/signUp", (req, res) => {
  res.render("signUp");
});
router.get("/order", (req, res) => {
  res.render("order");
});

router.get("/cart", (req, res) => {
  res.render("cart");
});

module.exports = router;
