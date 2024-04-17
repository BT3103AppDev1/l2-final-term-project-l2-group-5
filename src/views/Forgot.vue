<template>
    <div class="container1">
        <div id="brand">
            <img src="../assets/logo.png" class="logo">
            <h1 class="name">WeFriends</h1>
        </div>
        <div class="info">
            <div class="title-text">
                <h1 class="header">Reset Password</h1>
                <p class="subheader">Enter your email to reset your password.</p>
            </div>
            <form @submit.prevent="forgotPassword" class="forgot">
                <div id="email-input">
                    <h6 id="email-text">Email</h6>
                    <input type="email" v-model="email" /><br>
                    <button type="submit">Email me</button>
                </div>
                <div v-if="message">{{ message }}</div>
            </form>
            <div id="login-button">
                <p>Back to</p>
                <strong><router-link class="router-link" to="/login">Login</router-link></strong>
                <router-view/>   
            </div>
        </div>
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
            this.message = 
            'We could not find an account associated with that email. Please double-check and try again or sign up for a new account.';
          } else {
            sendPasswordResetEmail(auth, this.email)
              .then(() => {
                this.message =
                  'A link to reset your password has been sent to your email address.';
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

<style scoped>
#brand {
    display: flex;
    align-items: center;
    justify-content: center;
}

#logo-name {
    font-size: 20px;
}

#icon {
    height: 30px;
    width: auto;
    margin-right: 10px;
}
.title-text {
    margin-bottom: 10px;
}

.container1 {
    display: flex;
    flex-direction: column; /* stack children vertically */
    align-items: center; /* align children in the center horizontally */
    padding: 20px;
    background-color: #FBFAF1;
    min-height: 100vh;
    width: 100vw; /* set view to fill viewport */
}

.info {
    text-align: center;
    width: 100%;
}

.forgot {
    border: 1px solid black;
    padding: 5px 20px 20px 20px;
    border-radius: 10px;
    width: 550px;
    max-width: 100%;
    margin-left: auto;
    margin-right: auto;
    box-sizing: border-box;
    background-color: white;
    margin-bottom: 10px;
}

input {
    border: none; /* removes the default border */
    box-shadow: none; /* removes any shadow effects */
    outline: none; /* removes the outline shown on focus */
    background-color: #EAEAEA;
    border-radius: 10px;
    border: 1px solid black;
    text-align: left;
    padding: 12px 310px 12px 10px; 
    font-size: 12px;
}

#email-text {
    text-align: left;
    margin-left: 18px;
    font-size: 15px;
    margin-bottom: 12px;
}

.header {
    margin-bottom: 5px;
}

.subheader {
    margin-top: 0;
    font-size: 18px;
    margin-bottom: 60px;
}

button {
    margin-top: 20px;
    border-radius: 7px;
    padding: 8px 25px 8px 25px;
    color: white;
    background-color: #4d725a;
    border: none; /* removes the default border */
    box-shadow: none; /* removes any shadow effects */
    outline: none; /* removes the outline shown on focus */
    margin-bottom: 10px;
}

button:hover {
    background-color: #355740; /* Darker shade for hover effect */
    cursor: pointer; /* Changes cursor to pointer to indicate button */
}

#login-button {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 15px;
}

.router-link {
    margin-left: 5px;
    color: #3FA9F5;
}
</style>
