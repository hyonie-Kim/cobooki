var router = require("express").Router();
const { auth } = require("../middleware");
const { body } = require("express-validator");
const { commonController } = require("../controller");

const { validator } = require("../middleware");

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
router.get("/orders", auth.authentication, commonController.ordersRender);
router.get(
  "/myprofile/orders",
  auth.authentication,
  commonController.myOrderListRender
);
router.get("/logout", auth.authentication, commonController.logout);

// 로그인/로그아웃
router.post("/api/login", commonController.signIn);
router.post(
  "/api/signup",
  [
    body("email")
      .trim()
      .isLength({ min: 5 })
      .isEmail()
      .withMessage("다섯 자 이상 입력해 주세요."),
    body("password")
      .trim()
      .isLength({ min: 8 })
      .withMessage("8~10자리 비밀번호를 입력해주세요."),
    body("name")
      .trim()
      .isLength({ min: 2 })
      .withMessage("두 자 이상 입력해 주세요."),
    body("phone")
      .trim()
      .isLength({ min: 10 })
      .withMessage("핸드폰 번호를 다시 입력해 주세요."),
    body("address")
      .isLength({ min: 5 })
      .withMessage("다섯 자 이상 입력해주세요."),

    validator.validationChecker,
  ],
  commonController.signUp
);

module.exports = router;
