import { initializeApp } from "firebase/app"

import { getFirestore } from "firebase/firestore"

import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBnVR509B8eh8HtDFmjDewX1Y5JXECb2zg",

  authDomain:
    "gokul-portfolio-c6037.firebaseapp.com",

  projectId:
    "gokul-portfolio-c6037",

  storageBucket:
    "gokul-portfolio-c6037.firebasestorage.app",

  messagingSenderId:
    "931684143169",

  appId:
    "1:931684143169:web:a2cace5309f77c6450b6c0",
}

const app =
  initializeApp(firebaseConfig)

export const db =
  getFirestore(app)

export const auth =
  getAuth(app)