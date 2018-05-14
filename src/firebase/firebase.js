import firebase from 'firebase'

  var config = {
    apiKey: "AIzaSyDssvLRVF8q3ADmmzwnyoQ2egOrsgDSMCU",
    authDomain: "passwordmanager-2c20f.firebaseapp.com",
    databaseURL: "https://passwordmanager-2c20f.firebaseio.com",
    projectId: "passwordmanager-2c20f",
    storageBucket: "",
    messagingSenderId: "46467551602"
  };
  firebase.initializeApp(config);

  export const db = firebase.database()
  export const auth = firebase.auth()
