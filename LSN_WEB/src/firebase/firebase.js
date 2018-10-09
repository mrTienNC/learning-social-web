const firebase = require('firebase');

const config = {
  apiKey: 'AIzaSyBC88KOiuia2jyxZeLLycXCE42JxRguAt8',
  authDomain: 'clear-practice-202002.firebaseapp.com',
  databaseURL: 'https://clear-practice-202002.firebaseio.com',
  projectId: 'clear-practice-202002',
  storageBucket: '',
  messagingSenderId: '286399358837',
};
firebase.initializeApp(config);

module.exports = {
  onAuthStateChanged(e) {
    return firebase.auth().onAuthStateChanged(e);
  },
  logout() {
    return firebase.auth().signOut();
  },
  login() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(provider);
  },
  currentUser() {
    return firebase.auth().currentUser;
  },
};
