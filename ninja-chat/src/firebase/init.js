import firebase from 'firebase'
import firestore from 'firebase/firestore'

var firebaseConfig = {
    apiKey: "AIzaSyA7sKnPicuTB0p_-FId43Q1g7-mnERBItw",
    authDomain: "udemy-ninja-chat-ffe92.firebaseapp.com",
    databaseURL: "https://udemy-ninja-chat-ffe92.firebaseio.com",
    projectId: "udemy-ninja-chat-ffe92",
    storageBucket: "",
    messagingSenderId: "645401226456",
    appId: "1:645401226456:web:53dea487b916f5ef"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Export our database
export default firebaseApp.firestore();