import * as admin from "firebase-admin";
admin.initializeApp();
const db = admin.firestore();
const storage = admin.storage();
import { Request, Response } from "express";
// import multer = require("multer");
// var upload = multer({ storage: multer.memoryStorage() });

import stream = require("stream");

const dbSet = async (req: Request, res: Response) => {
  //   let id: number = 0;
  //   if (req.params && req.params.id && typeof req.params.id === "string") {
  //     id = Number(req.param.id);
  //   }
  const { id } = req.params;
  const docRef = db.collection("users").doc(`doc${id}`);

  await docRef.set({
    first: "ada",
    last: "love",
    born: 1815,
  });

  res.send("success dbSet");
};

const dbGet = async (req: Request, res: Response) => {
  const snapshot = await db.collection("users").get();
  snapshot.forEach((doc) => {
    console.log(doc.id, "=>", doc.data());
  });

  res.send("good");
};

const dbTestSet = async (req: Request, res: Response) => {
  var citiesRef = db.collection("cities");

  citiesRef.doc("SF").set({
    name: "San Francisco",
    state: "CA",
    country: "USA",
    capital: false,
    population: 860000,
    regions: ["west_coast", "norcal"],
  });
  citiesRef.doc("LA").set({
    name: "Los Angeles",
    state: "CA",
    country: "USA",
    capital: false,
    population: 3900000,
    regions: ["west_coast", "socal"],
  });
  citiesRef.doc("DC").set({
    name: "Washington, D.C.",
    state: null,
    country: "USA",
    capital: true,
    population: 680000,
    regions: ["east_coast"],
  });
  citiesRef.doc("TOK").set({
    name: "Tokyo",
    state: null,
    country: "Japan",
    capital: true,
    population: 9000000,
    regions: ["kanto", "honshu"],
  });
  citiesRef.doc("BJ").set({
    name: "Beijing",
    state: null,
    country: "China",
    capital: true,
    population: 21500000,
    regions: ["jingjinji", "hebei"],
  });

  res.send("good");
};

const dbQuery = async (req: Request, res: Response) => {
  var citiesRef = db.collection("cities");

  citiesRef.where("state", "==", "CA");
  citiesRef.where("population", "<", 100000);
  // .orderBy("population", "desc")
  // const result = await citiesRef.where("name", ">=", "San Francisco").get();

  // console.log(result);

  res.send("good");
};

interface MulterRequest extends Request {
  files: any;
}

const storageSet = async (req: Request, res: Response) => {
  let image = (req as MulterRequest).files[0];
  // let image: Express.Multer.File = req.file;
  const fileName: string = image.originalname;
  const bufferStream = new stream.PassThrough();
  // let a = new (Buffer.from(image.buffer, "ascii") as any);
  // const buf = new (Buffer.from(image.buffer, "ascii") as any);
  const buffer: Buffer = Buffer.from(image.buffer, "ascii");
  bufferStream.end(buffer);

  let file = storage.bucket().file(`test/${fileName}`);

  bufferStream
    .pipe(
      file.createWriteStream({
        metadata: {
          contentType: image.mimetype,
        },
      })
    )
    .on("error", (err) => {
      console.log("err : ", err);
    })
    .on("finish", () => {
      console.log(fileName + "finish");
    });

  res.send("good");
};

export { dbSet, dbGet, dbTestSet, dbQuery, storageSet };
