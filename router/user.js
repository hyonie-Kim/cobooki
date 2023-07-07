var router = require("express").Router();
const { userController } = require("../controller");
const { body } = require("express-validator");
const { validationChecker } = require("../middleware/validator");

router.get("/login", userController.signInRender);
router.post("/login", userController.signIn);
router.get("/signup", userController.signupRender);
router.post(
  "/signup",
  [
    body("email")
      .trim()
      .isLength({ min: 5 })
      .isEmail()
      .withMessage("id 다시 입력"),
    body("password").trim().isLength({ min: 8 }),
    body("name").trim().isLength({ min: 2 }).withMessage("이름 다시 입력"),
    validationChecker,
  ],
  userController.signUp
);
router.get("/logout", userController.logOut);

router.get("/detailPage", controller.detailPage); //test(지우)

module.exports = router;
