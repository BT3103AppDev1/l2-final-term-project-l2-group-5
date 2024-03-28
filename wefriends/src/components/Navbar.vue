<template>
    <div>
        <div class="nav-container">
            <div class="nav-option" @click="navigate('/profile')">
                <img :src="profilePictureUrl" alt="profile-picture" class="profile-picture-preview">
                <p>{{ username }}</p>
            </div>
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
import { getFirestore, doc, setDoc, query, where, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js"
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.0.2/firebase-auth.js';
import { getStorage, ref, getDownloadURL } from 'https://www.gstatic.com/firebasejs/9.0.2/firebase-storage.js';
import { useRouter } from 'vue-router';

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);
const usernamesCollection = collection(db, 'usernames');

export default {
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
        }
    },
}

</script>