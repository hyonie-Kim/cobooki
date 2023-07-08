var router = require("express").Router();
const myPageController = require("../controller/myPageController");

router.get("/orderCheck", myPageController.orderCheck);

module.exports = router;
