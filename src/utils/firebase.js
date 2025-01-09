// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDw9PmCtG40CEVpGmYj6ywBAVWdS9zOYSo",
    authDomain: "retail-edge-d5f26.firebaseapp.com",
    projectId: "retail-edge-d5f26",
    storageBucket: "retail-edge-d5f26.firebasestorage.app",
    messagingSenderId: "579827947018",
    appId: "1:579827947018:web:b11830e0be8b6a0134f1f3",
    measurementId: "G-HK4RP418VF"
  };
  
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Initialize Firebase Auth

export { auth };

