// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDAHqzFVax8DzIeRkEmkCmiwEh01GERkxc",
  authDomain: "job-sharing-platform.firebaseapp.com",
  projectId: "job-sharing-platform",
  storageBucket: "job-sharing-platform.appspot.com",
  messagingSenderId: "504843414617",
  appId: "1:504843414617:web:d896ef7d558e5c52e31548",
  measurementId: "G-3VQ35JC6LD"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const fireDB = getFirestore(app);