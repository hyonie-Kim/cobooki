var router = require("express").Router();
const { mainController } = require("../controller");

router.get("/", mainController.mainRender);

router.get("/book/:bookNum", mainController.detail);

router.get("/books", mainController.booKCategory);

// router.get("/order/:bookNum", mainController.order);

router.get("/cart", mainController.cart);

module.exports = router;
