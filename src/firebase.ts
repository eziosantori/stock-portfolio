// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore, collection, doc, setDoc, query, where, getDocs  } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import React, { useContext, createContext, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FB_APIKEY,
  authDomain: process.env.REACT_APP_FB_PROJECTID + ".firebaseapp.com",
  projectId: process.env.REACT_APP_FB_PROJECTID,
  storageBucket: process.env.REACT_APP_FB_PROJECTID +".appspot.com",
  messagingSenderId: "339428526200",
  appId: process.env.REACT_APP_FB_APPID,
  measurementId: "G-ETV328E2S7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const app = firebase.initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
export const db = getFirestore();

const googleProvider = new GoogleAuthProvider();

export type SignInWithGoogle = () => Promise<void>;
export const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const users = collection(db, "users");
    const q = query(users, where("uid", "==", user.uid));
    var docs = await getDocs(q);
    // const query = await users
    //   .where("uid", "==", user.uid)
    //   .get();

    if (docs.size === 0) {
      await setDoc(doc(users), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err: any) {
    console.error(err);
    alert(err.message);
  }
};

export type SignInWithEmailAndPassword = (email: string, password: string) => Promise<void>;
export const signInWithEmailAndPassword = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(email, password);
  } catch (err: any) {
    console.error(err);
    alert(err.message);
  }
};

export type RegisterWithEmailAndPassword = (name: string, email: string, password: string) => Promise<void>;

export const registerWithEmailAndPassword = async (name: string, email: string, password: string) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    const users = doc(collection(db, "users"));
    await setDoc(users, {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (err: any) {
    console.error(err);
    alert(err.message);
  }
};
export type SendPasswordResetEmail= (email: string) => Promise<void>;
export const sendPasswordResetEmail = async (email: string) => {
  try {
    await sendPasswordResetEmail(email);
    alert("Password reset link sent!");
  } catch (err: any) {
    console.error(err);
    alert(err.message);
  }
};
export type Logout = () => void;
export const logout = () => {
  auth.signOut();
};
