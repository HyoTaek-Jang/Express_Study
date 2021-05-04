import express from "express";
import * as db from "../model/db";

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

router.post("/dbSet:id", db.dbSet);
router.post("/dbTestSet", db.dbTestSet);
router.get("/dbGet", db.dbGet);
router.get("/dbQuery", db.dbQuery);

export = router;
