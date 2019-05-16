import Firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyC5vpKYpLxoZm7Fla0X28jYg4ykcoDxt2Y",
    authDomain: "managerapp-6d2b9.firebaseapp.com",
    databaseURL: "https://managerapp-6d2b9.firebaseio.com",
    projectId: "managerapp-6d2b9",
    storageBucket: "managerapp-6d2b9.appspot.com",
    messagingSenderId: "951960710724",
    appId: "1:951960710724:web:70a73e442d4a7f68"
  };

export const Fire = Firebase.initializeApp(firebaseConfig)