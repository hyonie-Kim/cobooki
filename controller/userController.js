const { request } = require("express");

exports.index = (req, res) => {
  res.render("index");
};
exports.signIn = (req, res) => {
  res.render("signIn");
};

exports.signUp = (req, res) => {
  res.render("signUp");
};

exports.order = (req, res) => {
  res.render("order");
};

exports.cart = (req, res) => {
  res.render("cart");
};

exports.header = (req, res) => {
  //test(지우)
  console.log("data: " + req.params.str);
  res.render("header");
};

exports.myProfile = (req, res) => {
  res.render("myProfile");
};
