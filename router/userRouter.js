var router = require("express").Router();
const { userController } = require("../controller");
const { body } = require("express-validator");
const { validator } = require("../middleware");
const { auth } = require("../middleware");

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
router.get("/logout", auth.authentication, userController.logOut);
router.put("/", auth.authentication, userController.userUpdate);
router
  .route("/delete")
  .get(auth.authentication, userController.delete)
  .delete(auth.authentication, userController.unregister);

module.exports = router;
