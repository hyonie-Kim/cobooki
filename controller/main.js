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

  detail(req, res) {
    Product.findOne({ bookNum: req.params.bookNum })
      .exec()
      .then((docInfo) => {
        console.log(docInfo);
        // res.send({ bookInfo: docInfo });
        // res.render("detailPage", { bookInfo: docInfo });
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
