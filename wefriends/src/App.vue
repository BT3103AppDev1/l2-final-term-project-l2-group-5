<template>
  <div id="nav">
    <router-link to="/">Landing</router-link> |
    <router-link to="/home">Home</router-link> |
    <router-link to="/forgot">Forgot</router-link> |
    <router-link to="/education">Education</router-link> |
    <router-link to="/diary">Diary</router-link> |
    <router-link to="/clinics">Clinics</router-link> |
    <router-link to="/profile">Profile</router-link> |
    <router-link to="/forum">Forum</router-link>
  </div>
  <!-- temp -->
  <div>
    <button @click="checkLoginStatus">
      Check Login Status
    </button>
  </div>
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