// var admin = require("firebase-admin");
// var serviceAccount = require("./serviceAccountKey.json");
import admin from "firebase-admin";
import serviceAccount from "./serviceAccountKey.json";
import dotenv from "dotenv";


dotenv.config();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as any),
  databaseURL: `https://${process.env.REACT_APP_FB_PROJECTID}.firebaseio.com`
});

// Set up an instance of the DB
export const db = admin.firestore();