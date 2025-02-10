// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig1 = {
  apiKey: "AIzaSyBVSqZoENzbmjZ_s6wpGTZdY9SywbY9mDk",
  authDomain: "ticketnest-35ce3.firebaseapp.com",
  projectId: "ticketnest-35ce3",
  storageBucket: "ticketnest-35ce3.appspot.com",
  messagingSenderId: "921797971651",
  appId: "1:921797971651:web:b42b4b4f518772627e5c76"
};


// Initialize Firebase
// const app = initializeApp(firebaseConfig);
export const APP1 = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig1) ;

export const fireStoreDb1 = getFirestore(APP1) ;
export const auth = getAuth() ;


//  Firebase configuration2 using seema-1 firebase for storage purpose
const firebaseConfig2 = {
  apiKey: "AIzaSyADLWDQlUJkCiq-Y7tW6_OSeWpMeym5QTg",
  authDomain: "seema-1.firebaseapp.com",
  projectId: "seema-1",
  storageBucket: "seema-1.appspot.com",
  messagingSenderId: "776951936989",
  appId: "1:776951936989:web:333a99316493b47afee834"
};

//give unique name i.e secondApp given here
export const APP2 = getApp.length > 0 ? getApp() : initializeApp(firebaseConfig2 , 'secondApp') ;
export const storage = getStorage(APP2)

