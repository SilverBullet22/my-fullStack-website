import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBsRZCCGrRo_ZkU98LeGKTlsYuV-e0z4bE",
  authDomain: "my-portfolio-e5444.firebaseapp.com",
  projectId: "my-portfolio-e5444",
  storageBucket: "my-portfolio-e5444.firebasestorage.app",
  messagingSenderId: "187332894705",
  appId: "1:187332894705:web:36413869cae69d282bee50"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
