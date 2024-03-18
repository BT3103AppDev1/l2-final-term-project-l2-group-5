<template>
    <button @click="logout">Logout</button>
</template>


<script>
import firebaseApp from "../firebase.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js"
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js"
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.0.2/firebase-auth.js';

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

export default {
  data() {
    return {
      isLoggedIn: false
    };
  },
  methods: {
    logout() {
        auth.signOut().then(() => {
        console.log('Logged out');
        // Redirect or perform some action upon successful logout
        // this.$router.push({ name: 'login' });
      }).catch((error) => {
        console.error('Sign Out Error', error);
      }); 
    }
  }
}

</script>