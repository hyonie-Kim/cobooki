const User = require("../Model/user"); // User 스키마 연결
const { Product } = require("../Model/product");
const { Counter } = require("../Model/counter");
const { productService } = require("../service");

const adminController = {
  adminRender(req, res) {
    User.find({})
      .exec()
      .then((userData) => {
        console.log(
          "=============== 어드민 페이지 (회원관리) ===============",
          userData
        );
        res.render("admin/adminPage", {
          userData: userData,
          userEmail: (req.session.userEmail != null) ? req.session.userEmail : null
        });
      })
      .catch((err) => {
        console.log(err);
        res.render("admin/admin", {
          userData: [],
          userEmail: (req.session.userEmail != null) ? req.session.userEmail : null
        });
      });
  },

  uploadRender(req, res) {
    res.render("admin/upload", { userEmail: (req.session.userEmail != null) ? req.session.userEmail : null });
  },

  order(req, res) {
    res.render("admin/orderManagement", { userEmail: (req.session.userEmail != null) ? req.session.userEmail : null });
  },

  async upload(req, res) {
    let temp = {
      // _id: counterInfo.bookNum,
      productName: req.body.productName,
      category: req.body.category,
      desc: req.body.desc,
      imageURL: req.body.imageURL,
      inventory: req.body.inventory,
      price: req.body.price,
    };
    //console.log(req.body);

    const NewProduct = await productService.createProduct(temp);
    if (NewProduct) {
      res.send("상품 저장 성공");
      // res.redirect("/")
    } else res.send("상품저장실패");
  },
};

module.exports = adminController;
