<template>
    <div id="left-half">
        <img src="../assets/bckgrnd-img.png" alt="bckgrnd-img">
    </div>
    <div id="right-box">
        <div id="brand">
            <img src="../assets/logo.png" class="logo">
            <h1 class="name">WeFriends</h1>
        </div>
        <h1 id="login-text">Login</h1>
        <h2 id="login-text">We are glad to have you back here today.</h2>
        <form @submit.prevent="submitForm">
            <div class="rounded-input">
                <input type="text" v-model="email" placeholder="Email">
            </div>
            <div class="rounded-input">
                <input type="password" v-model="password" placeholder="Password">
            </div>
            <div v-if="errorMessage" class="error-message">
                <span v-html="errorMessage"></span>
            </div>
            <div id="forget-password">
                <router-link to="/forgot">Forget Password?</router-link>
            </div>
            <button type="submit" id="login-button">Login</button>
        </form>
        <div class="signup-prompt">
            Don't have an account? <router-link to="/signup" class="signup-link">Sign Up</router-link>
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

.error-message {
    text-align: center;
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

#login-text {
    margin-left: 10%;
}

#brand {
    display: flex;
    align-items: center;
    justify-content: center;
}

</style>


<script>
import firebaseApp from '@/firebase'
import { getAuth, signInWithEmailAndPassword, setPersistence, browserLocalPersistence} from 'https://www.gstatic.com/firebasejs/9.0.2/firebase-auth.js';
import { useRouter } from 'vue-router';

const auth = getAuth(firebaseApp);
setPersistence(auth, browserLocalPersistence);

export default {
  data() {
    return {
      email: '',
      password: '',
      errorMessage:'',
    };
  },
  setup() {
    const router = useRouter();
    return { router };
  },
  methods: {
    async submitForm() {
    try {
        await signInWithEmailAndPassword(auth, this.email, this.password);
        this.errorMessage = '';
        this.$router.push('/home');
    } catch (error) {
        if (error.code === 'auth/wrong-password') {
            this.errorMessage = 'Sign in unsuccessful. <br>The email or password you entered is not valid. Please try again.';
        } else {
            this.errorMessage = 'Sign in unsuccessful. <br>The email or password you entered is not valid. Please try again.';
        }
    }
    }
}
}
</script>
