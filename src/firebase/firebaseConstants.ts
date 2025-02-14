// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// TODO: Use environment variables in github deploy action to inject keys
export const FIREBASE_CONFIG = {
    apiKey: 'AIzaSyD15FzZfH0rOK88CRkX3Ah-N91eGyIhxOI',
    authDomain: 'acoxweb.firebaseapp.com',
    projectId: 'acoxweb',
    storageBucket: 'acoxweb.appspot.com',
    messagingSenderId: '683238566125',
    appId: '1:683238566125:web:2f8046df07982678b144e4',
    measurementId: 'G-J5GH4L0M3T'
}

// Initialize Firebase
export const firebaseApp = initializeApp(FIREBASE_CONFIG)
const analytics = getAnalytics(firebaseApp)