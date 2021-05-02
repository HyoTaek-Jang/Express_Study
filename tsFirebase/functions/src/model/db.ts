import * as admin from "firebase-admin";
import { Request, Response } from "express";

admin.initializeApp();
const db = admin.firestore();

const dbModel = async (req: Request, res: Response) => {
  const docRef = db.collection("users").doc("doc1");

  await docRef.set({
    first: "ada",
    last: "love",
    born: 1815,
  });

  res.send("success dbSet");
};

export = dbModel;
