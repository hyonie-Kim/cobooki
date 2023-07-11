const { Product } = require("../Model/product");
const { Counter } = require("../Model/counter");
const { productService } = require("../service");

const adminController = {
  adminRender(req, res) {
    product
      .find()
      .toArray()
      .then(() => {
        // res.render("admin/adminPage", { bookData: bookData });
        res.render("index", { bookData: bookData });
      })
      .catch((err) => {
        console.log(err);
        // res.render("admin/adminPage", { bookData: [] });
        res.render("index", { bookData: [] });
      });
    // res.render("admin/adminPage")
  },
  uploadRender(req, res) {
    res.render("admin/upload");
  },

  order(req, res) {
    res.render("admin/orderManagement");
  },

  adminRender(req, res) {
    // Product.find()
    //   .exec()
    //   .then((bookData) => {
    //     res.render("admin/adminPage", { bookData: bookData });
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     res.render("admin/adminPage", { bookData: [] });
    //   });
    res.render("admin/adminPage");
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

  detail(req, res) {
    postMessage
      .findOne({ bookNum: req.params.bookNum })
      .exec()
      .then((docInfo) => {
        // res.render("detailPage", { postInfo: docInfo });
        console.log(docInfo);
      });
  },
};

module.exports = adminController;
