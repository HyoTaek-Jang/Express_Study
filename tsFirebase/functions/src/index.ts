import * as functions from "firebase-functions";
// import express from "express";
import router from "./router/testRouter";
// const admin = require("firebase-admin");

// admin.initializeApp();

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", { structuredData: true });
  response.send("Hello from Firebase!");
});

export const testRoute = functions.https.onRequest(router);

// import multer = require("multer");
// var upload = multer({ storage: multer.memoryStorage() });

export const photo = functions.https.onRequest((request, response) => {
  console.log(request.body);
  response.send("good");
});
