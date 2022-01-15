import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyBhiiPr198T25tOWAto5RaqcJnRJLk_Q3U",
  authDomain: "vuejs-axios-blog-cd13c.firebaseapp.com",
  databaseURL: "https://vuejs-axios-blog-cd13c.firebaseio.com",
  projectId: "vuejs-axios-blog-cd13c",
  storageBucket: "vuejs-axios-blog-cd13c.appspot.com",
  messagingSenderId: "317743287767",
  appId: "1:317743287767:web:a0bf551f67c0b647074f92",
  measurementId: "G-52JHE4RDKP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db=getFirestore()