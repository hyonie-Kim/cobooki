var router = require("express").Router();
const { adminController } = require("../controller");
const { validationChecker } = require("../middleware/validator");

router.get("/", adminController.adminRender);
router.get("/upload", adminController.uploadRender);
router.post("/post/upload", adminController.upload);
router.get("/post/:postNum", adminController.detail);

router.get("/order", adminController.order);

module.exports = router;
