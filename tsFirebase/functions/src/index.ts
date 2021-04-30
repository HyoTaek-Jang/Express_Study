import * as functions from "firebase-functions";
// import express from "express";
import router from "./router/testRouter";

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", { structuredData: true });
  response.send("Hello from Firebase!");
});

// const app = express();

// app.get("/123", (req, res) => {
//   res.send("123");
// });

export const testRoute = functions.https.onRequest(router);
