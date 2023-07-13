var router = require("express").Router();
const { myprofileController, ordersController } = require("../controller");
const { auth } = require("../middleware");

router.get("/", auth.authentication, myprofileController.getProfile);
router.get("/ordercheck", auth.authentication, ordersController.getOrderList);

module.exports = router;
