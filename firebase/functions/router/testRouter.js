const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("get /");
});

router.post("/", (req, res) => {
  res.send("post /");
});

router.get("/a", (req, res) => {
  res.send("get /a");
});

router.get("/:id", (req, res) => {
  console.log(req.query.asd);
  res.send("get /:id" + req.params.id);
});

module.exports = router;
