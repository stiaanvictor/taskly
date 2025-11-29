import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, getRedirectResult } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA1MATl8ZJfJpjyTyKi1gzATYh9MqoVN5s",
  authDomain: "theinput-daa19.firebaseapp.com",
  projectId: "theinput-daa19",
  storageBucket: "theinput-daa19.firebasestorage.app",
  messagingSenderId: "851741911978",
  appId: "1:851741911978:web:bf4a4c2198f9f7849dd9d3",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
export { getRedirectResult };
