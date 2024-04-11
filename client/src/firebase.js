// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY, //the way to use it in vite
  authDomain: "mern-estate-345f5.firebaseapp.com",
  projectId: "mern-estate-345f5",
  storageBucket: "mern-estate-345f5.appspot.com",
  messagingSenderId: "219484737527",
  appId: "1:219484737527:web:8be5bc8119899196eee8f2",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
