var router = require("express").Router();
const { adminController } = require("../controller");
const { auth } = require("../middleware");

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
router.put(
  "/order/:orderId",
  auth.authentication,
  auth.authorization,
  adminController.updateOrder
);
module.exports = router;
