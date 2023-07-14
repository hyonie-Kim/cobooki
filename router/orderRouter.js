var router = require("express").Router();
const { auth } = require("../middleware");
const { ordersController } = require("../controller");

router.post("/", auth.authentication, ordersController.insertOrder);
router.put(
  "/:orderId",
  auth.authentication,
  auth.authorization,
  ordersController.updateOrder
);
router.delete(
  "/:orderId",
  auth.authentication,
  auth.authorization,
  ordersController.deleteOrder
);

module.exports = router;
