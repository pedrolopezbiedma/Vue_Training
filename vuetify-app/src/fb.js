import firebase from 'firebase/app';
import 'firebase/firestore';

var firebaseConfig = {
    apiKey: "AIzaSyCq-psNyhfC1f76hR3391rifOD5SqgjES4",
    authDomain: "vuetifydatabase.firebaseapp.com",
    databaseURL: "https://vuetifydatabase.firebaseio.com",
    projectId: "vuetifydatabase",
    storageBucket: "vuetifydatabase.appspot.com",
    messagingSenderId: "672785402290",
    appId: "1:672785402290:web:045ac8b3729d8266"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
//db.settings({ timestampsInSnapshots: true});
export default db;