const User = require("../Model/user"); // User 스키마 연결
const { Product } = require("../Model/product");
const { Counter } = require("../Model/counter");
const { productService } = require("../service");

const adminController = {
  // 회원 관리 리스트
  async adminRender(req, res) {
    const users = await User.find({});
    res.render("admin/adminPage", { users });
  },

  uploadRender(req, res) {
    res.render("admin/upload");
  },

  order(req, res) {
    res.render("admin/orderManagement");
  },

  // 상품 등록
  async upload(req, res) {
    let temp = {
      // _id: counterInfo.bookNum,
      name: req.body.name,
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
