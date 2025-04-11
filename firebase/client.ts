// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBjt6hTTepIE1OtUwlKsV-cm2X6ZfKn4Zk',
  authDomain: 'interview-project-642f0.firebaseapp.com',
  projectId: 'interview-project-642f0',
  storageBucket: 'interview-project-642f0.firebasestorage.app',
  messagingSenderId: '699491935391',
  appId: '1:699491935391:web:d1b94ce3568f2d0a902eaa',
  measurementId: 'G-4B5ZJ69YHJ',
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);

// const analytics = getAnalytics(app);
