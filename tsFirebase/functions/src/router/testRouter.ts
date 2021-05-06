import express from "express";
import * as db from "../model/db";
// import * as a from "../model/photo";
const fileMiddleware = require("express-multipart-file-parser");

const app = express();

app.use(fileMiddleware);

app.get("/", (req, res) => {
  res.send("get /");
});

app.post("/", (req, res) => {
  res.send("post /");
});

app.get("/a", (req, res) => {
  res.send("get /a");
});

app.get("/asd/:id", (req, res) => {
  console.log(req.query.asd);
  res.send("get /:id" + req.params.id);
});

app.post("/dbSet:id", db.dbSet);
app.post("/dbTestSet", db.dbTestSet);
app.get("/dbGet", db.dbGet);
app.get("/dbQuery", db.dbQuery);

/*
const multer = require("multer");

const storage = multer();

app.post("/photo", storage.single("a"), (req, res) => {
  res.send(req.file);
});
*/
// import * as admin from "firebase-admin";
// admin.initializeApp();
// // const db = admin.firestore();
// const storage = admin.storage();

// import multer = require("multer");
// var upload = multer();

interface middleRequest {
  files: any[];
}

app.post("/photo", (req, res) => {
  console.log((req as middleRequest).files[0]);
  res.send("good");
  // const fileBuff = req.file.buffer;
  // const fileName = req.file.filename;
  // const mimeType = req.file.mimetype;

  // const file = storage.bucket().file(fileName);

  // file
  //   .save(fileBuff)
  //   .then((success) => {
  //     res.json({
  //       uploaded: true,
  //       created_at: new Date().getTime(),
  //       filename: fileName,
  //       mimeType: mimeType,
  //     });
  //   })
  //   .catch((err) => {
  //     console.error("err: " + err);
  //     // var error = new ErrorResponse(400);
  //     // error.errors += err;
  //     res.json(err);
  //   });
  // console.log(req.file);
  // res.send(req.body);
});
app.post("/storageSet", db.storageSet);
// app.post("/photo", upload.single("photo"), a.a);

export = app;
