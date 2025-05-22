// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-96df5.firebaseapp.com",
  projectId: "mern-auth-96df5",
  storageBucket: "mern-auth-96df5.firebasestorage.app",
  messagingSenderId: "1062902166192",
  appId: "1:1062902166192:web:d42de8597a6b32f12ac175"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);