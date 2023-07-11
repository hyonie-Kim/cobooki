const { Product } = require("../Model/product");
const { Counter } = require("../Model/counter");

const mainController = {
  mainRender(req, res) {
    Product.find()
      .exec()
      .then((bookData) => {
        console.log(bookData);
        res.render("index", { bookData: bookData });
      })
      .catch((err) => {
        console.log(err);
        res.render("index", { bookData: [] });
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
