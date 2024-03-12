<template>
    <div>
        <h1>Reset Password</h1>
        <h3>Enter your email to reset your password.</h3>
        <form @submit.prevent="forgotPassword" class="forgot">
            <h6>Email</h6>
            <input type="email" v-model="email" />
            <button type="submit">Email me</button>
            <div v-if="message">{{ message }}</div>
        </form>
        <router-link to="/login">Login</router-link>
        <router-view/>
    </div>
</template>

<script>
import { getAuth, sendPasswordResetEmail, fetchSignInMethodsForEmail } from 'https://www.gstatic.com/firebasejs/9.0.2/firebase-auth.js';
import firebaseApp from "@/firebase";

const auth = getAuth(firebaseApp);

export default {
  data() {
    return {
      email: '',
      message: '',
    };
  },
  methods: {
    forgotPassword() {
      fetchSignInMethodsForEmail(auth, this.email)
        .then((methods) => {
          if (methods.length === 0) {
            this.message = 'This email is not registered!';
          } else {
            sendPasswordResetEmail(auth, this.email)
              .then(() => {
                this.message =
                  'Reset email has been sent.';
              })
              .catch((error) => {
                this.message =
                  'An error occurred. Please try again later.';
              });
          }
        })
        .catch((error) => {
          console.error('Error checking email:', error.message);
          this.message = 'An error occurred. Please try again later.';
        });
    },
  },
};
</script>
