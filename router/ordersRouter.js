var router = require("express").Router();
const { ordersController } = require("../controller");
const { auth } = require("../middleware");

router.get("/", auth.authentication, ordersController.getOrder);
router.post("/", auth.authentication, ordersController.insertOrder);

module.exports = router;
