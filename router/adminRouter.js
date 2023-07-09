var router = require("express").Router();
const admin = require("../controller/admin");

router.get("/", admin.adminRender);
router.get("/upload", admin.upload);

module.exports = router;
