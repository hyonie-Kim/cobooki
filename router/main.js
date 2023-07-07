var router = require("express").Router();
const main = require("../controller/main");

router.get("/", main.mainRender);

router.get("/order", main.order);

router.get("/cart", main.cart);

router.get("/header", main.header); //test(지우)

router.get("/myProfile", main.myProfile);

router.get("/deleteUser", main.deleteUser);

module.exports = router;
