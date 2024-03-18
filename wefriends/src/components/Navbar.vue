<template>
    <button @click="logout">Logout</button>
</template>


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
        }
    }
}

</script>