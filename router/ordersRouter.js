var router = require("express").Router();
const { ordersController } = require("../controller");

router.get("/:bookNum", ordersController.getOrder);
// router.get("/:userId", ordersController.findOrder);
router.post("/", ordersController.insertOrder);

module.exports = router;
