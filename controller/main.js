const { Product } = require("../Model/product");
const { Counter } = require("../Model/counter");

const mainController = {
  mainRender(req, res) {
    Product.find()
      .exec()
      .then((postData) => {
        console.log(postData);
        res.render("index", { postData: postData });
      })
      .catch((err) => {
        console.log(err);
        res.render("index", { postData: [] });
      });
  },

  order(req, res) {
    res.render("order");
  },

  cart(req, res) {
    res.render("cart");
  },

  deleteUser(req, res) {
    res.render("deleteUser");
  },
};

module.exports = mainController;
