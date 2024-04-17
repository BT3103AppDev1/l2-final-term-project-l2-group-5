import firebase from 'firebase/compat/app';

const firebaseConfig = {
  apiKey: "AIzaSyCR9Bhd3x6QhaqG0AsucAp_D3QFZscHml4",
  authDomain: "wefriends-d7032.firebaseapp.com",
  projectId: "wefriends-d7032",
  storageBucket: "wefriends-d7032.appspot.com",
  messagingSenderId: "733914162197",
  appId: "1:733914162197:web:c14977249e7b6e3dae9a1c",
  measurementId: "G-MSRVLPMEQY"
};

firebase.initializeApp(firebaseConfig);

export default firebase;