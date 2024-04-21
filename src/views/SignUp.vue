<template>
  <div id="left-half">
    <img src="../assets/bckgrnd-img.png" alt="bckgrnd-img">
  </div>

  <div id="right-box">
    <div id="brand">
      <img src="../assets/logo.png" class="logo">
      <h1 class="name">WeFriends</h1>
    </div>

    <h1 id="header-text">Sign Up</h1>
    <h2 id="header-text">Be part of our ever-growing community today.</h2>

    <form @submit.prevent="register">
      <div class="rounded-input">
        <input type="email" placeholder="Email address..." v-model="email" />
        <div class="error-message" v-if="errorMessages.invalidEmail">Email already in use. Please use a different email.</div>
      </div>

      <div class="rounded-input">
        <input type="password" placeholder="Password..." v-model="password" />
        <div class="error-message" v-if="errorMessages.invalidPassword">Password needs at least 1 capital letter, 1 special character, and be at least 8 characters long.</div>
      </div>

      <div class="rounded-input">
        <input type="password" placeholder="Confirm Password..." v-model="confirmPassword" />
        <div class="error-message" v-if="errorMessages.passwordsMismatch">Passwords do not match.</div>
      </div>
      
      <button type="submit" id="button" :disabled="fieldsFilled" :class="{'disabled-button':fieldsFilled}">Register</button>
    </form>

    <div class="signup-prompt">
      Have an account? <router-link to="/login" class="signup-link">Login</router-link>
    </div>

    <div v-if="registrationSuccess" class="success-message">
      Registration successful!
    </div>

    <!-- Firebase UI -->
    <br>
        <div class="google">or</div>
        <div id="firebaseui-auth-container"></div>
  </div>
</template>

<style scoped>
.google {
  display: flex;
  align-items: center;
  text-align: center;
}
.google::before,
.google::after {
  content: '';
  flex: 1;
  border-bottom: 1px solid #000;
}
.google:not(:empty)::before {
  margin-right: .25em;
}
.google:not(:empty)::after {
  margin-left: .25em;
}

.error-message {
  color: red;
  font-family: 'Nunito Sans', sans-serif;
  font-weight: bold;
  font-size: smaller;
  margin-bottom: 2%;
}

#left-half {
    position: absolute;
    left: 0;
    width: 50%;
    height: 100%;
    background-color: #436850;
    padding: 20px;
}

#left-half img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
}

#right-box {
    position: absolute;
    right: 0;
    width: 50%;
    height: 100%;
    background-color: #FBFAF0;
    padding: 20px;
}

.rounded-input input {
    border-radius: 10px;
    background-color: white;
    width: 80%;
    height: 30px;
    padding: 10px;
    border: 1px solid #ccc;
    margin-bottom: 10px;
    border-left: 10%;
}

.rounded-input {
    margin-left: 10%;
}

#forget-password {
    text-align: right;
    margin-right: 15%;
}

#button {
    background-color: #436850;
    border: none; 
    border-radius: 10px;
    width: 20%;
    height: 40px;
    padding: 10px;
    color: white;
    text-align: center;
    display: block;
    margin: 10px auto; 
    cursor: pointer; 
}

.signup-prompt {
    display: flex;
    justify-content: center;
}

.signup-link {
    margin-left: 10px;
}

#header-text {
    margin-left: 10%;
}

#brand {
    display: flex;
    align-items: center;
    justify-content: center;
}

.success-message {
  margin-top: 20px;
  text-align: center;
  color: green;
}

#button.disabled-button {
  background-color: #e4e4e4;
  cursor: not-allowed;
}

</style>

<script>
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.0.2/firebase-auth.js';
import firebaseApp from "@/firebase";
import firebase from '@/uifire.js';
import 'firebase/compat/auth';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';
import router from '@/router';

const auth = getAuth(firebaseApp);

export default {
  data() {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      registrationSuccess: false,
      errorMessages: {
        invalidEmail: false,
        invalidPassword: false,
        passwordsMismatch: false,
      }
    };
  },
  mounted() {
    const uiContainer = document.getElementById("firebaseui-auth-container");
    uiContainer.innerHTML = '';

    let ui = firebaseui.auth.AuthUI.getInstance();
    if (ui) {
        ui.reset(); 
    } else {
        ui = new firebaseui.auth.AuthUI(firebase.auth());
    }

    var uiConfig = {
        signInSuccessUrl: '/home',
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        ]
    };
    ui.start("#firebaseui-auth-container", uiConfig);
  },
  computed: {
    fieldsFilled() {
      return !(this.email && this.password && this.confirmPassword);
    },
  },
  methods: {
    async register() {
      this.errorMessages.invalidEmail = false;
      this.errorMessages.invalidPassword = false;
      this.errorMessages.passwordsMismatch = false;

      if (this.password !== this.confirmPassword) {
        this.errorMessages.passwordsMismatch = true;
        this.password = '';
        this.confirmPassword = '';
        return;
      }
      
      const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/;
      if (!passwordRegex.test(this.password)) {
        this.errorMessages.invalidPassword = true;
        this.password = '';
        this.confirmPassword = '';
        return;
      }

      try {
      await createUserWithEmailAndPassword(auth, this.email, this.password);
      await signInWithEmailAndPassword(auth, this.email, this.password);

      router.push('/home');

      } catch (error) {
        if (error.code === 'auth/email-already-in-use') {
          this.errorMessages.invalidEmail = true;
          this.email = '';
          this.password = '';
          this.confirmPassword = '';
          return;

        } else {
          alert(error.message);
        }
      }
    },
  },
};
</script>