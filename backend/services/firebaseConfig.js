// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBjae4liueNKTRKjClmsvjtAzKcq6SW2ec",
  authDomain: "green-quest-563ad.firebaseapp.com",
  projectId: "green-quest-563ad",
  storageBucket: "green-quest-563ad.firebasestorage.app",
  messagingSenderId: "978170249277",
  appId: "1:978170249277:web:7a4313ac4ee7eb3773aa54",
  measurementId: "G-2K6KX2NM3H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);