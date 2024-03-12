<template>
  <div>
    <h1>SignUp</h1>
    <router-link to="/login">Login</router-link>
    <router-view />
    <p>OR</p>
    <form @submit.prevent="register" class="register-child">
      <input type="email" placeholder="Email address..." v-model="email" />
      <input type="password" placeholder="Password..." v-model="password" />
      <input type="password" placeholder="Confirm Password..." v-model="confirmPassword" />
      <button type="submit">Register</button>
    </form>

    <div v-if="registrationSuccess" class="success-message">
      Registration successful! You can now log in.
    </div>
    
  </div>
</template>

<script>
import { getAuth, createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.0.2/firebase-auth.js';
import firebaseApp from "@/firebase";

const auth = getAuth(firebaseApp);

export default {
  data() {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      registrationSuccess: false,
    };
  },
  methods: {
    register() {
      if (this.password !== this.confirmPassword) {
        alert('Passwords do not match!');
        this.password = '';
        this.confirmPassword = '';
        return;
      }
      createUserWithEmailAndPassword(auth, this.email, this.password)
        .then(() => {
          this.registrationSuccess = true;
          this.email = '';
          this.password = '';
          this.confirmPassword = '';
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            alert('Email is already in use. Please use a different email address.');
            this.email = '';
            this.password = '';
            this.confirmPassword = '';
          } else {
            alert(error.message);
          }
        });
    },
  },
};
</script>

<style>
.success-message {
  margin-top: 10px;
  color: green;
}
</style>
