import { API_KEY } from "@/secrets";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage"; // AsyncStorage import

// Firebase config
const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: "medi-tracker-df8bc.firebaseapp.com",
  projectId: "medi-tracker-df8bc",
  storageBucket: "medi-tracker-df8bc.firebasestorage.app",
  messagingSenderId: "558666705182",
  appId: "1:558666705182:web:969b3f20355f27d084010f",
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth
const auth = getAuth(app);

// firestore!
const db = getFirestore(app);

export { auth, db };
