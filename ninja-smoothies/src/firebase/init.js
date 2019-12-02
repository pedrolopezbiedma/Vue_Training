import firebase from 'firebase'
import firestore from 'firebase/firestore'

var firebaseConfig = {
    apiKey: "AIzaSyA9JZtpZHWjjuQdZ4qVmcnNqjkT36v7u2U",
    authDomain: "udemy-ninja-smoothies-d8be2.firebaseapp.com",
    databaseURL: "https://udemy-ninja-smoothies-d8be2.firebaseio.com",
    projectId: "udemy-ninja-smoothies-d8be2",
    storageBucket: "",
    messagingSenderId: "1082362532613",
    appId: "1:1082362532613:web:04516578669e78bd"
  };
  // Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Export our database
export default firebaseApp.firestore();