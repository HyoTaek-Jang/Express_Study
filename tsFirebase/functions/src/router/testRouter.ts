import express from "express";

const router = express();

router.get("/", (req, res) => {
  res.send("get /");
});

router.post("/", (req, res) => {
  res.send("post /");
});

router.get("/a", (req, res) => {
  res.send("get /a");
});

router.get("/asd/:id", (req, res) => {
  console.log(req.query.asd);
  res.send("get /:id" + req.params.id);
});

export = router;
