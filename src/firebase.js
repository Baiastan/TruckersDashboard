// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  authDomain: "expense-tracker-aa0b3.firebaseapp.com",
  databaseURL: "https://expense-tracker-aa0b3-default-rtdb.firebaseio.com",
  projectId: "expense-tracker-aa0b3",
  storageBucket: "expense-tracker-aa0b3.appspot.com",
  messagingSenderId: "695752152813",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
