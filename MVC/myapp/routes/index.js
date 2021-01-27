var express = require("express");
var router = express.Router();
const ctrl = require("./ctrl/home");

/* GET home page. */
router.get("/", ctrl["output.home"]);

router.get("/login", ctrl["output.login"]);

module.exports = router;
