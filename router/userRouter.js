var router = require("express").Router();
const { userController } = require("../controller");
const { auth } = require("../middleware");

router.post("/", auth.authentication, userController.createUser);
router.delete("/", auth.authentication, userController.deleteUser);
router.put("/", auth.authentication, userController.updateUser);

module.exports = router;
