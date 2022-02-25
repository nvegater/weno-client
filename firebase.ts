import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "@firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyATFDXPqSlprYJRVKbWZQxcXyYaRA81yng",
  authDomain: "weno-c74f7.firebaseapp.com",
  projectId: "weno-c74f7",
  storageBucket: "weno-c74f7.appspot.com",
  messagingSenderId: "185254134560",
  appId: "1:185254134560:web:34aec9213f93948e9ccd45",
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

const db = getFirestore();

const storage = getStorage();

export { app, db, storage };
