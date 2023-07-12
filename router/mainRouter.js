var router = require("express").Router();
const { mainController } = require("../controller");

router.get("/", mainController.mainRender);

router.get("/book/:bookNum", mainController.detail);

router.get("/books", mainController.booKCategory);

router.get("/order", mainController.order);

router.get("/cart", mainController.cart);

router.get("/deleteUser", mainController.deleteUser);

module.exports = router;
