import { initializeApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";

const apiKey = process.env.REACT_APP_API_KEY;
const authDomain = process.env.REACT_APP_AUTH_DOMAIN;
const projectId = process.env.REACT_APP_PROJECT_ID;
const storageBucket = process.env.REACT_APP_STORAGE_BUCKET;
const messagingSenderId = process.env.REACT_APP_MESSAGING_SENDER_ID;
const appId = process.env.REACT_APP_APP_ID;
const measurementId = process.env.REACT_APP_MEASUREMENT_ID;

const config = {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
  measurementId
};

const app = initializeApp(config);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const functions = getFunctions();

if (location.hostname === "localhost") {
    connectAuthEmulator(auth, "http://127.0.0.1:9099", { disableWarnings: true });
    connectFirestoreEmulator(db, '127.0.0.1', 8080);
    connectFunctionsEmulator(functions, "127.0.0.1", 5001);
};

