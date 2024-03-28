<template>
  <div id="message">
    <h2>404</h2>
    <h1>Page Not Found</h1>
    <p>Please check the URL for mistakes and try again.</p>
    <router-link :to="redirectPath" class="redirect-link">Back to {{ destination }}</router-link>
  </div>
</template>

<script>
import { getAuth } from 'firebase/auth';

export default {
  name: 'NotFound',
  data() {
    return {
      loggedIn: false,
    };
  },
  computed: {
    redirectPath() {
      return this.loggedIn ? '/home' : '/';
    },
    destination() {
      return this.loggedIn ? 'Home' : 'Main Page';
    },
  },
  created() {
    // Check if the user is logged in and update the loggedIn data property accordingly
    this.checkLoginStatus();
  },
  methods: {
    checkLoginStatus() {
      const auth = getAuth();
      auth.onAuthStateChanged((user) => {
        if (user) {
          this.loggedIn = true;
        } else {
          this.loggedIn = false;
        }
      });
    },
  },
};
</script>

  
<style scoped>
#message {
  background: white;
  max-width: 360px;
  margin: 100px auto 16px;
  padding: 32px 24px 16px;
  border-radius: 3px;
}

#message h3 {
  color: #888;
  font-weight: normal;
  font-size: small;
  margin: 16px 0 12px;
}

#message h2 {
  color: #ADBC9F;
  font-weight: bold;
  font-size: xx-large;
  margin: 0 0 8px;
}

#message h1 {
  color: rgba(0,0,0,0.6);
  font-weight: 300;
  font-size: larger;
  margin: 0 0 16px;
}

#message p {
  line-height: 140%;
  margin: 16px 0 24px;
  font-size: 14px;
}

.redirect-link {
  display: block;
  text-align: center;
  background: #436850;
  text-transform: uppercase;
  text-decoration: none;
  color: white;
  padding: 16px;
  border-radius: 10px;
}

.redirect-link:hover {
  background-color: #34503b;
}
</style>
