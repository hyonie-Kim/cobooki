var router = require("express").Router();
const { userController } = require("../controller");
const { auth } = require("../middleware");
const { validator } = require("../middleware");
const { body } = require("express-validator");

router.post("/login", userController.findUser);
router.post(
  "/signup",
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
  userController.createUser
);
router.delete("/", auth.authentication, userController.deleteUser);
router.put("/", auth.authentication, userController.updateUser);

module.exports = router;
