import * as admin from "firebase-admin";
import { Request, Response } from "express";

admin.initializeApp();
const db = admin.firestore();

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

export { dbSet, dbGet, dbTestSet, dbQuery };
