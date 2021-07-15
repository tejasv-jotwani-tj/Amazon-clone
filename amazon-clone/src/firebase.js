import firebase from 'firebase'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC57aP371tlF8v4XYPFipKjAP0OsDT4D0Y",
    authDomain: "challenge-2021-f5f36.firebaseapp.com",
    projectId: "challenge-2021-f5f36",
    storageBucket: "challenge-2021-f5f36.appspot.com",
    messagingSenderId: "1095621815729",
    appId: "1:1095621815729:web:c6fb99729602577d14a190",
    measurementId: "G-TBSRGM2LL6"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();
  const auth = firebaseApp.auth();

  export {db,auth} ;