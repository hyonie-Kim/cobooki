var router = require("express").Router();
var controller = require("../controller/userController");
const { User } = require("../Model/user");

router.get("/", controller.index);

router.get("/signIn", controller.signIn);

router.get("/signUp", controller.signUp);

router.get("/order", controller.order);

router.get("/cart", controller.cart);

router.get("/header", controller.header); //test(지우)

router.get("/myProfile", controller.myProfile);

router.get("/detailPage", controller.detailPage); //test(지우)

module.exports = router;
