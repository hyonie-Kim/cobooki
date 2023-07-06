var router = require("express").Router();
var controller = require("../controller/userController");
const { body } = require("express-validator");
const { validationChecker } = require("../middleware/validator");

router.get("/login", controller.signInRender);
router.post("/login", controller.signIn);
router.get("/signup", controller.signupRender);
router.post(
  "/signup",
  [
    body("email")
      .trim()
      .isLength({ min: 5 })
      .isEmail()
      .withMessage("id 다시 입력"),
    body("password").trim().isLength({ min: 10 }),
    body("name").trim().isLength({ min: 2 }).withMessage("이름 다시 입력"),
    validationChecker,
  ],
  controller.signUp
);

module.exports = router;
