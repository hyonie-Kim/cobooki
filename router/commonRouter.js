var router = require("express").Router();
const { auth } = require("../middleware");
const { body } = require("express-validator");
const {
  mainController,
  userController,
  ordersController,
  myprofileController,
  adminController,
} = require("../controller");

const { validator } = require("../middleware");

router.get("/", mainController.mainRender);
router.get("/book/:bookNum", mainController.detail);
router.get("/books", mainController.booKCategory);
router.get("/cart", mainController.cart);

router
  .route("/login")
  .get(userController.signInRender)
  .post(userController.signIn);

router
  .route("/signup")
  .get(userController.signupRender)
  .post(
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
    userController.signUp
  );
router.get("/delete", auth.authentication, userController.delete);

router.get("/orders", auth.authentication, ordersController.getOrder);
router.post("/orders", auth.authentication, ordersController.insertOrder);

router.get("/ordercheck", auth.authentication, ordersController.getOrderList);

router.get("/myprofile", auth.authentication, myprofileController.getProfile);

router.get(
  "/admin",
  auth.authentication,
  auth.authorization,
  adminController.adminRender
);
router.get(
  "/admin/upload",
  auth.authentication,
  auth.authorization,
  adminController.uploadRender
);

router.get(
  "admin/order",
  auth.authentication,
  auth.authorization,
  adminController.order
);

module.exports = router;
