var router = require("express").Router();
const { auth } = require("../middleware");
const { commonController } = require("../controller");

// render
router.get("/", commonController.mainRender);
router.get("/signup", commonController.signupRender);
router.get("/login", commonController.signInRender);
router.get("/delete", auth.authentication, commonController.deleteRender);
router.get("/myprofile", auth.authentication, commonController.profileRender);
router.get(
  "/admin/users",
  auth.authentication,
  auth.authorization,
  commonController.adminUserListRender
);
router.get(
  "/admin/products",
  auth.authentication,
  auth.authorization,
  commonController.adminProductListRender
);
router.get("/books", commonController.booksRender);
router.get("/books/:bookNum", commonController.detailBooksRender);
router.get("/carts", commonController.cartsRender);
router.get(
  "/orders/:bookNum",
  auth.authentication,
  commonController.ordersRender
);
router.get(
  "/myprofile/orders",
  auth.authentication,
  commonController.myOrderListRender
);
router.get("/logout", auth.authentication, commonController.logout);

module.exports = router;
