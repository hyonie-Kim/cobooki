const { productService } = require("../service");

const productController = {
  // 상품 등록
  async insertProduct(req, res) {
    let temp = {
      // _id: counterInfo.bookNum,
      name: req.body.name,
      category: req.body.category,
      desc: req.body.desc,
      imageURL: req.body.imageURL,
      inventory: req.body.inventory,
      price: req.body.price,
    };

    const NewProduct = await productService.createProduct(temp);
    if (NewProduct) {
      res.send("상품 저장 성공");
      // res.redirect("/")
    } else res.send("상품저장실패");
  },
};

module.exports = productController;
