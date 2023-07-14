var router = require("express").Router();
const { auth } = require("../middleware");
const { productController } = require("../controller");

router.post(
  "/",
  auth.authentication,
  auth.authorization,
  productController.insertProduct
);

module.exports = router;
