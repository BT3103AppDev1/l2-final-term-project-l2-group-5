<template>
    <div class="container">
        <div class="nav-container">
            <div :class="{ 'nav-option': true, 'selected': $route.path === '/profile' }" @click="navigate('/profile')">
                <img :src="profilePictureUrl" alt="profile-picture" class="profile-picture-preview">
                <p>{{ username }}</p>
            </div>
            <div :class="{ 'nav-option': true, 'selected': $route.path === '/home' }" @click="navigate('/home')">
                <img :src="selectedIcon('/home')" alt="home-icon">
                <p>Home</p>
            </div>
            <div :class="{ 'nav-option': true, 'selected': $route.path === '/education' }" @click="navigate('/education')">
                <img :src="selectedIcon('/education')" alt="education-icon">
                <p>Education</p>
            </div>
            <div :class="{ 'nav-option': true, 'selected': $route.path === '/forum' }" @click="navigate('/forum')">
                <img :src="selectedIcon('/forum')" alt="forum-icon">
                <p>Forum</p>
            </div>
            <div :class="{ 'nav-option': true, 'selected': $route.path === '/diary' }" @click="navigate('/diary')">
                <img :src="selectedIcon('/diary')" alt="diary-icon">
                <p>Diary</p>
            </div>
            <div :class="{ 'nav-option': true, 'selected': $route.path === '/clinics' }" @click="navigate('/clinics')">
                <img :src="selectedIcon('/clinics')" alt="clinics-icon">
                <p>Clinics Near Me</p>
            </div>
            <div id="space">
            </div>
            <div class="nav-option" @click="showModal = true">
                <img src="@/assets/navbar/logout.png" alt="logout-">
                <p>Logout</p>
            </div>
            <Confirmation 
                v-if="showModal"
                :isVisible="showModal"
                title="Confirm Logout"
                message="Are you sure you want to log out?"
                @confirm="logout"
                @cancel="cancelModal"
            />
        </div>
    </div>
</template>

<style scoped>
.container{
    background-color: white;
}

.nav-container {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    margin-left: 12%;
    margin-right: 12%;
    margin-top: 3%;
}

.nav-option {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 5%;
    cursor: pointer;
    margin-bottom: 4%;
}

.selected {
    background-color: #436850;
    color: white;
    border-radius: 12px;
}

.nav-option:hover:not(.selected) {
    background-color: #b8b8b8;
    border-radius: 12px;
}

.nav-option img {
    margin-right: 8px;
    margin-left: 8px;
}

.nav-option p {
    margin: 8px;
}

#space {
    height: 24vh;
}

.profile-picture-preview {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
    margin: 0;
}
</style>

<script>
import firebaseApp from "../firebase.js";
import { getFirestore, query, where, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js"
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.0.2/firebase-auth.js';
import { getStorage, ref, getDownloadURL } from 'https://www.gstatic.com/firebasejs/9.0.2/firebase-storage.js';
import { useRouter } from 'vue-router';
import Confirmation from '@/components/Confirmation.vue';

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);
const usernamesCollection = collection(db, 'usernames');

import homeSelect from "@/assets/navbar/home-select.png";
import educationSelect from "@/assets/navbar/education-select.png";
import forumSelect from "@/assets/navbar/forum-select.png";
import diarySelect from "@/assets/navbar/diary-select.png";
import clinicsSelect from "@/assets/navbar/clinics-select.png";
import home from "@/assets/navbar/home.png";
import education from "@/assets/navbar/education.png";
import forum from "@/assets/navbar/forum.png";
import diary from "@/assets/navbar/diary.png";
import clinics from "@/assets/navbar/clinics.png";

export default {
    components: {
        Confirmation
    },
    setup() {
        const router = useRouter();
        return { router };
    },
    data() {
        return {
            username: null,
            profilePictureUrl: null,
            userId: null,
            userEmail: null,
            icons: {
                '/home': { normal: home, selected: homeSelect },
                '/education': { normal: education, selected: educationSelect },
                '/forum': { normal: forum, selected: forumSelect },
                '/diary': { normal: diary, selected: diarySelect },
                '/clinics': { normal: clinics, selected: clinicsSelect }
            },
            showModal: false
        };
    },
    async created() {
        // Retrieve User Details
        await new Promise((resolve, reject) => {
            const unsubscribe = auth.onAuthStateChanged(user => {
                unsubscribe();
                if (user) {
                    // User is signed in.
                    this.userId = user.uid;
                    this.userEmail = user.email;
                    resolve();
                } else {
                    // No user is signed in.
                    console.log("No user is signed in.");
                    reject(new Error("No user is signed in."));
                }
            });
        });
        // Retrieve user profile
        try {
            console.log(this.userId)
            const profileQuery = query(usernamesCollection, where('userId', '==', this.userId));
            getDocs(profileQuery)
                .then(snapshot => {
                    if (!snapshot.empty) {
                        const docSnapshot = snapshot.docs[0];
                        const docData = docSnapshot.data();
                        console.log("Document data:", docData);
                        this.username = docData.username;
                    } else {
                        console.log("No document matches the query.");
                    }
                })
                .catch(error => {
                    console.log(error);
                })
        } catch (error) {
            console.log(error);
        }
        // Retrieve Profile Picture
        const storageRef = ref(storage, `ProfilePictures/${this.userId}`);
        try {
            const url = await getDownloadURL(storageRef);
            this.profilePictureUrl = url;
        } catch (error) {
            console.error("Error fetching image URL:", error);
        }
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
        },
        selectedIcon(path) {
            const icon = this.icons[path];
            return this.$route.path === path ? icon.selected : icon.normal;
        },
        cancelModal() {
            this.showModal = false;
        },
    }
}

</script>