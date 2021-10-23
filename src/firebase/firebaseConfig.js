
import { initializeApp } from "firebase/app";
import {GoogleAuthProvider, FacebookAuthProvider} from "firebase/auth"
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAq_4MeAPfCojU08WcXjUCDtexnY-30ziE",
  authDomain: "prueba-final-483a2.firebaseapp.com",
  projectId: "prueba-final-483a2",
  storageBucket: "prueba-final-483a2.appspot.com",
  messagingSenderId: "803539956807",
  appId: "1:803539956807:web:6358cd9b7de248c686ad62"
};


const app = initializeApp(firebaseConfig);
const google = new GoogleAuthProvider()
const facebook = new FacebookAuthProvider()
const db = getFirestore()

export {google,  facebook ,app, db}
