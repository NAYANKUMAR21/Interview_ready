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
  apiKey: process.env.NEXT_PUBILIC_CLIENT_API_KEY!,
  authDomain: process.env.NEXT_PUBILIC_CLIENT_AUTHDOMAIN!,
  projectId: process.env.NEXT_PUBILIC_CLIENT_PROJECTID!,
  storageBucket: process.env.NEXT_PUBILIC_CLIENT_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBILIC_CLIENT_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBILIC_CLIENT_APP_ID!,
  measurementId: process.env.NEXT_PUBILIC_CLIENT_MEASUREMENT!,
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);

// const analytics = getAnalytics(app);
