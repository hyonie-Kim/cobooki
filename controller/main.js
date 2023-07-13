const { Product } = require("../Model/product");
const { Counter } = require("../Model/counter");

const mainController = {
  mainRender(req, res) {
    Product.find()
      .exec()
      .then((bookData) => {
        // console.log(
        //   "====================================== 메인페이지 ===============",
        //   bookData
        // );
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
      .then((bookInfo) => {
        console.log(
          "====================================== 상세페이지 ===============",
          bookInfo
        );
        // res.send({ bookInfo: docInfo });
        res.render("detailPage", { bookInfo });
      });
  },

  booKCategory(req, res) {
    Product.find({ category: req.query.category })
      .exec()
      .then((bookData) => {
        console.log(
          "====================================== 카테고리 페이지 ===============",
          bookData
        );
        res.render("products", { bookData: bookData });
      })
      .catch((err) => {
        console.log(err);
        res.render("products", { bookData: [] });
      });
  },

  // ========== 상품 수정 ==========
  // edit(req,res){
  //   Product.findOne({bookNum: req.params.bookNum})
  //   .exec()
  //   .then((docInfo)=>{
  //     res.render("edit", {bookNum:docInfo})
  //   })
  // },

  cart(req, res) {
    res.render("cart");
  },
};

module.exports = mainController;
