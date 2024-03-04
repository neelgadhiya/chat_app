import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBVUQGqC4C8_2VJyRqd8_Fn3U0dNbpK2j4",
  authDomain: "chatapp-3577e.firebaseapp.com",
  projectId: "chatapp-3577e",
  storageBucket: "chatapp-3577e.appspot.com",
  messagingSenderId: "37277165382",
  appId: "1:37277165382:web:20c1c704f5e95700c0e747",
  measurementId: "G-G4089RJCFY"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();

export { auth, provider };
export default db;
