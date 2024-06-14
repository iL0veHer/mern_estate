// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-f919a.firebaseapp.com",
  projectId: "mern-estate-f919a",
  storageBucket: "mern-estate-f919a.appspot.com",
  messagingSenderId: "225026366452",
  appId: "1:225026366452:web:35c9d2cf6612a6c5f5b7a1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);