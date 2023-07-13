const { Product } = require("../Model/product");
const { Counter } = require("../Model/counter");

const mainController = {
  mainRender(req, res) {
    Product.find()
      .exec()
      .then((bookData) => {
        console.log(
          "====================================== 메인페이지 ===============",
          bookData
        );
        res.render("index", { bookData: bookData, userEmail: (req.session.userEmail != null) ? req.session.userEmail : null });

      })
      .catch((err) => {
        console.log(err);
        res.render("index", { bookData: [], userEmail: (req.session.userEmail != null) ? req.session.userEmail : null });
      });
  },

  detail(req, res) {
    Product.findOne({ bookNum: req.params.bookNum })
      .exec()
      .then((docInfo) => {
        console.log(
          "====================================== 상세페이지 ===============",
          docInfo
        );
        // res.send({ bookInfo: docInfo });
        res.render("detailPage", { bookInfo: docInfo, userEmail: (req.session.userEmail != null) ? req.session.userEmail : null });
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
        res.render("products", { bookData: bookData, userEmail: (req.session.userEmail != null) ? req.session.userEmail : null });
      })
      .catch((err) => {
        console.log(err);
        res.render("products", { bookData: [], userEmail: (req.session.userEmail != null) ? req.session.userEmail : null });
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

  order(req, res) {
    Product.findOne({ bookNum: req.params.bookNum })
      .exec()
      .then((docInfo) => {
        console.log(
          "====================================== 주문페이지 ===============",
          docInfo
        );
        // res.send({ bookInfo: docInfo });
        res.render("order", { bookInfo: docInfo, userEmail: (req.session.userEmail != null) ? req.session.userEmail : null });
      });
    //res.render("order", { userEmail: (req.session.userEmail != null) ? req.session.userEmail : null });
  },

  cart(req, res) {
    if (req.session.userEmail == null) {
      res.render("signIn", { userEmail: null })
      //res.write("<script>alert('로그인이 필요한 서비스입니다.')</script>");
    } else {
      res.render("cart", { userEmail: (req.session.userEmail != null) ? req.session.userEmail : null })
      //res.write("<script>alert('🫡장바구니에 담겼습니다! \n 장바구니 페이지로 이동합니다.')</script>");
    }
  },

  deleteUser(req, res) {
    res.render("deleteUser", { userEmail: (req.session.userEmail != null) ? req.session.userEmail : null });
  },
};

module.exports = mainController;


