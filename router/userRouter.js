var router = require("express").Router();
const { userController } = require("../controller");
const { auth } = require("../middleware");

router.get("/logout", auth.authentication, userController.logOut);
router.put("/", auth.authentication, userController.userUpdate);
router.delete("/delete", auth.authentication, userController.unregister);

module.exports = router;
