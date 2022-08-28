// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, initializeFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage";

//import 'firebase/compat/firestore';
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCnVtIlylETOy7Ujq2_F3U1VPrgov3sDkM",
  authDomain: "fir-auth-a10bc.firebaseapp.com",
  projectId: "fir-auth-a10bc",
  storageBucket: "fir-auth-a10bc.appspot.com",
  messagingSenderId: "1032605227767",
  appId: "1:1032605227767:web:2937b42b7b3316839311f2",
  measurementId: "G-X4VR4YNNX9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = new getAuth(app);
const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});

const storage = getStorage(app);

export {auth, db, storage} 


// const db = app.firestore();
// const auth = firebase.auth();

// const db = getFirestore();

// const auth = getAuth();
