import { API_KEY } from "@/secrets";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: "medi-tracker-df8bc.firebaseapp.com",
  projectId: "medi-tracker-df8bc",
  storageBucket: "medi-tracker-df8bc.firebasestorage.app",
  messagingSenderId: "558666705182",
  appId: "1:558666705182:web:969b3f20355f27d084010f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
