const express = require("express");
const router = express.Router();

const admin = require("firebase-admin");
const dateFormat = require("dateformat");
const multer = require("multer");
const stream = require("stream"); // firebase Admin 초기화
const firebaseAdmin = admin.initializeApp(
  { credential: admin.credential.cert({}) },
  "storage"
);
// var upload = multer({ storage: multer.memoryStorage() }); /// /// Storage 관련 ///
// router.get("/upload", function (req, res, next) {
//   res.render("storage/upload");
//   return;
// });
// router.post("/photo", upload.single("photo"), function (req, res, next) {
//     var image = req.file;
//     var bufferStream = new stream.PassThrough();
//     bufferStream.end(new Buffer.from(image.buffer, "ascii"));
//     var fileName = image.originalname;
//     let file = firebaseAdmin.storage().bucket().file(fileName);
//     bufferStream
//       .pipe(file.createWriteStream({ metadata: { contentType: image.mimetype } }))
//       .on("error", (eer) => {
//         console.log(err);
//       })
//       .on("finish", () => {
//         console.log(fileName + " finish");
//         res.redirect("download?imgName=" + image.originalname);
//         return;
//       });
//   });

const a = () => {
  var image = req.file;
  var bufferStream = new stream.PassThrough();
  bufferStream.end(new Buffer.from(image.buffer, "ascii"));
  var fileName = image.originalname;
  let file = firebaseAdmin.storage().bucket().file(fileName);
  bufferStream
    .pipe(file.createWriteStream({ metadata: { contentType: image.mimetype } }))
    .on("error", (eer) => {
      console.log(err);
    })
    .on("finish", () => {
      console.log(fileName + " finish");
      res.redirect("download?imgName=" + image.originalname);
      return;
    });
};

export { a };
