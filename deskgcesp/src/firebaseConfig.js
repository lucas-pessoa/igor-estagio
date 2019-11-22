import * as firebase from "firebase";
// replace this variable, with your own config variable
// from your firebase project
var config = {
    apiKey: "AIzaSyAGc9Xnv8QcxiEH1Iq-ah3Yg3_N-JXNPBY",
    authDomain: "deskgcesp-c46e5.firebaseapp.com",
    databaseURL: "https://deskgcesp-c46e5.firebaseio.com",
    projectId: "deskgcesp-c46e5",
    storageBucket: "deskgcesp-c46e5.appspot.com",
    messagingSenderId: "675406424994",
    appId: "1:675406424994:web:833ab6d086812b08"
};
let firebaseConfig = firebase.initializeApp(config);
export default firebaseConfig;
