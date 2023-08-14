// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "coder-curso-react.firebaseapp.com",
    projectId: "coder-curso-react",
    storageBucket: "coder-curso-react.appspot.com",
    messagingSenderId: "603118089507",
    appId: "1:603118089507:web:75b69ac6cf19f4c6254896"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;