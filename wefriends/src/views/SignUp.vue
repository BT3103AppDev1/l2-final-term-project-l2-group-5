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
        <input type="text" placeholder="Username..." v-model="username" />
      </div>

      <div class="rounded-input">
        <input type="email" placeholder="Email address..." v-model="email" />
      </div>

      <div class="rounded-input">
        <input type="password" placeholder="Password..." v-model="password" />
      </div>

      <div class="rounded-input">
        <input type="password" placeholder="Confirm Password..." v-model="confirmPassword" />
      </div>
      
      <button type="submit" id="login-button" :disabled="fieldsFilled" :class="{'disabled-button':fieldsFilled}">Register</button>
    </form>

    <div class="signup-prompt">
      Have an account? <router-link to="/login" class="signup-link">Login</router-link>
    </div>

    <div v-if="registrationSuccess" class="success-message">
      Registration successful! You can now log in.
    </div>
  </div>
</template>

<style scoped>
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

#login-button {
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

#login-button.disabled-button {
  background-color: #e4e4e4;
  cursor: not-allowed;
}

</style>

<script>
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'https://www.gstatic.com/firebasejs/9.0.2/firebase-auth.js';
import { getFirestore, collection, addDoc, query, where, getDocs } from 'https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js';
import firebaseApp from "@/firebase";

const db = getFirestore(firebaseApp);
const usernamesCollection = collection(db, 'usernames');
const auth = getAuth(firebaseApp);

export default {
  data() {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      username: '',
      registrationSuccess: false,
    };
  },
  computed: {
    fieldsFilled() {
      return !(this.email && this.password && this.confirmPassword && this.username);
    },
  },
  methods: {
    async register() {
      if (this.password !== this.confirmPassword) {
        alert('Passwords do not match!');
        this.password = '';
        this.confirmPassword = '';
        return;
      }

      try {
        const usernameQuery = query(usernamesCollection, where('username', '==', this.username));
        const usernameSnapshot = await getDocs(usernameQuery);
        
        if (usernameSnapshot.size > 0) {
          alert('Username is already in use. Please use a different username.');
          this.username = '';
          return;
        }

        const userCredential = await createUserWithEmailAndPassword(auth, this.email, this.password);
        await updateProfile(userCredential.user, { displayName: this.username });
        await addDoc(usernamesCollection, { userId: userCredential.user.uid, username: this.username });

        this.registrationSuccess = true;
        this.email = '';
        this.password = '';
        this.confirmPassword = '';
        this.username = '';

      } catch (error) {
        if (error.code === 'auth/email-already-in-use') {
          alert('Email is already in use. Please use a different email address.');
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