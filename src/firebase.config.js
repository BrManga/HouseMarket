import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore'
console.log(process.env.REACT_APP_FIREBASE_API_KEY)
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "vuejs-axios-blog-cd13c.firebaseapp.com",
  databaseURL: "https://vuejs-axios-blog-cd13c.firebaseio.com",
  projectId: "vuejs-axios-blog-cd13c",
  storageBucket: "vuejs-axios-blog-cd13c.appspot.com",
  messagingSenderId: "317743287767",
  appId: process.env.REACT_APP_FIREBASE_API_ID,
  measurementId: "G-52JHE4RDKP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db=getFirestore()