var router = require("express").Router();
const main = require("../controller/main");

router.get("/", main.mainRender);

router.get("/order", main.order);

router.get("/cart", main.cart);

router.get("/deleteUser", main.deleteUser);

module.exports = router;
