<template>
    <div>
        <div class="nav-container">
            <div class="nav-option" @click="navigate('/home')">
                <img src="@/assets/navbar/home.png" alt="home-icon">
                <p>Home</p>
            </div>
            <div class="nav-option" @click="navigate('/education')">
                <img src="@/assets/navbar/education.png" alt="education-icon">
                <p>Education</p>
            </div>
            <div class="nav-option" @click="navigate('/forum')">
                <img src="@/assets/navbar/forum.png" alt="forum-icon">
                <p>Forum</p>
            </div>
            <div class="nav-option" @click="navigate('/diary')">
                <img src="@/assets/navbar/diary.png" alt="diary-icon">
                <p>Diary</p>
            </div>
            <div class="nav-option" @click="navigate('/clinics')">
                <img src="@/assets/navbar/clinics.png" alt="clinics-icon">
                <p>Clinics Near Me</p>
            </div>
            <div id="space">
            </div>
            <div class="nav-option" @click="logout">
                <img src="@/assets/navbar/logout.png" alt="logout-icon">
                <p>Logout</p>
            </div>
        </div>
    </div>
    
</template>

<style scoped>
.nav-container {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
}
.nav-option {
    display: flex;
    align-items: center;
    width: 100%;
    margin-left: 10%;
    padding: 5%;
    cursor: pointer;
}
.nav-option:hover {
    background-color: #FBFAF0;
}
.nav-option img {
    margin-right: 8px;
    margin-left: 8px;
}
.nav-option p {
    margin: 8px;
}
#space {
    height: 12vh;
}
</style>

<script>
import firebaseApp from "../firebase.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js"
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js"
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.0.2/firebase-auth.js';
import { useRouter } from 'vue-router';

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

export default {
    data() {
        return {
            isLoggedIn: false
        };
    },
    setup() {
        const router = useRouter();
        return { router };
    },
    methods: {
        logout() {
            auth.signOut().then(() => {
                console.log('Logged out');
                this.$router.push('/');
            }).catch((error) => {
                console.error('Sign Out Error', error);
            });
        },
        navigate(path) {
            this.$router.push(path);
        }
    }
}

</script>