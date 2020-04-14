import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'


var firebaseConfig = {
    apiKey: "",
    authDomain: "lithub-aab3a.firebaseapp.com",
    databaseURL: "https://lithub-aab3a.firebaseio.com",
    projectId: "lithub-aab3a",
    storageBucket: "lithub-aab3a.appspot.com",
    messagingSenderId: "19370109670",
    appId: "1:19370109670:web:1e3732cda21864a756a927",
    measurementId: "G-MP3VC0PRML"
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)
//firebase.analytics()

firebase.firestore().settings({ timestampsInSnapshots: true })

export default firebase;