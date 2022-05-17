// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBfgpHLPchmRnMnkIECbt2fS3io0u2sO_Q",
  authDomain: "umat-past-questions-database.firebaseapp.com",
  projectId: "umat-past-questions-database",
  storageBucket: "umat-past-questions-database.appspot.com",
  messagingSenderId: "943275989703",
  appId: "1:943275989703:web:c4e99f2291d34955e3bce2",
  measurementId: "G-QNPF1GLP9C",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
getAnalytics(app);
