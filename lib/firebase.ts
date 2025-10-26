// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDLS6jrP82CR5wDBTkSuzZiXDx3D40Wwfc",
  authDomain: "astro-ai-2025.firebaseapp.com",
  projectId: "astro-ai-2025",
  storageBucket: "astro-ai-2025.firebasestorage.app",
  messagingSenderId: "51779293613",
  appId: "1:51779293613:web:1c0e6406bb26d6ccd2d124",
  measurementId: "G-C837S227EH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };