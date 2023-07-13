var router = require("express").Router();
const { adminController } = require("../controller");
const { validationChecker } = require("../middleware/validator");
const auth = require("../middleware/auth");

router.get(
  "/",
  auth.authentication,
  auth.authorization,
  adminController.adminRender
);
router.get(
  "/upload",
  auth.authentication,
  auth.authorization,
  adminController.uploadRender
);
router.post(
  "/post/upload",
  auth.authentication,
  auth.authorization,
  adminController.upload
);
router.get(
  "/order",
  auth.authentication,
  auth.authorization,
  adminController.order
);

module.exports = router;
