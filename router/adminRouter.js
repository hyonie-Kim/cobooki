var router = require("express").Router();
const { adminController } = require("../controller");
const { auth } = require("../middleware");

router.post(
  "/post/upload",
  auth.authentication,
  auth.authorization,
  adminController.upload
);

router.put(
  "/order/:orderId",
  auth.authentication,
  auth.authorization,
  adminController.updateOrder
);
router.delete(
  "/order/:orderId",
  auth.authentication,
  auth.authorization,
  adminController.deleteOrder
);
module.exports = router;
