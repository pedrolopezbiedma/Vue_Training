import firebase from 'firebase'
import firestore from 'firebase/firestore' 

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBhS4nLj9_APpY_YbkPEnKGz5p1oAOk6uI",
    authDomain: "udemy-geo-ninjas-92f92.firebaseapp.com",
    databaseURL: "https://udemy-geo-ninjas-92f92.firebaseio.com",
    projectId: "udemy-geo-ninjas-92f92",
    storageBucket: "",
    messagingSenderId: "47650791160",
    appId: "1:47650791160:web:918ef04cf05c15ab"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Export our database
export default firebaseApp.firestore();