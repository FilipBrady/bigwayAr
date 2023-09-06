// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDZTrUdVaFlVh7hxr3zkt9rGL_ntYZSKXw',
  authDomain: 'bigwayar.firebaseapp.com',
  projectId: 'bigwayar',
  storageBucket: 'bigwayar.appspot.com',
  messagingSenderId: '811744119483',
  appId: '1:811744119483:web:e19b357bb32ad1ab87379e',
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_STORAGE = getStorage(FIREBASE_APP);
