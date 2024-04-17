<template>
  <router-view />
</template>

<script>
import firebaseApp from "./firebase.js";
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.0.2/firebase-auth.js';

const auth = getAuth(firebaseApp);

export default {
  name: 'App',

  data() {
    return {
      isLoggedIn: false
    };
  },
  created() {
    this.checkLoginStatus();
  },
  methods: {
    checkLoginStatus() {
      auth.onAuthStateChanged((user) => {
        if (user) {
          // User is signed in.
          console.log(user)
          this.isLoggedIn = true;
        } else {
          // No user is signed in.
          this.isLoggedIn = false;
        }
      });
    }
  }
}
</script>

<style>
body {
  font-family: 'Nunito Sans', sans-serif;
  margin: 0;
  padding: 0;
}

.router-link-active,
.router-link-exact-active,
a {
  text-decoration: none;
}
</style>