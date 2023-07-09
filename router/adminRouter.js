var router = require("express").Router();
const admin = require("../controller/admin");

router.get("/", admin.adminRender);
router.get("/upload", admin.upload);
// router.post("/post/upload", admin.post_upload);

router.get("/order", admin.order);

module.exports = router;
