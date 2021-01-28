var express = require("express");
var router = express.Router();
const ctrl = require("./ctrl/home");

/* GET home page. */
router.get("/", ctrl.output.home);
router.get("/login", ctrl.output.login);
router.get("/register", ctrl.output.register);
router.post("/login", ctrl.process.login);
router.post("/register", ctrl.process.register);

module.exports = router;
