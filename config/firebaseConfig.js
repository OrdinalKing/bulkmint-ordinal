// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCaAUQdQNuwhfYhwjalyP68KVyJOwmbymo",
  authDomain: "scrappingordinal.firebaseapp.com",
  projectId: "scrappingordinal",
  storageBucket: "scrappingordinal.appspot.com",
  messagingSenderId: "122401873460",
  appId: "1:122401873460:web:dac8cd54fa4c864bb93461",
  measurementId: "G-M5HV5X39EM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const total = 20;