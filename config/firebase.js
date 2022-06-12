import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyA322xBk0xe_X0DFwWqgOStjjxlDwMyqeI",
    authDomain: "binar-lat-10.firebaseapp.com",
    projectId: "binar-lat-10",
    storageBucket: "binar-lat-10.appspot.com",
    messagingSenderId: "677024155034",
    appId: "1:677024155034:web:26f2245d250bfe828fa623"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)

export default app