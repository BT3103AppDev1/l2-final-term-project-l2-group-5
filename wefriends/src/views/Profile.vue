<template>
    <div id="view">
        <Navbar id="navbar" />
        <div id="right-side">
            <TopBar :pageName="pageName" id="topbar" />
            <div id="content">
                <div id="user-email-picture-div">
                    <div id="user-email-div">
                        <div class="rounded-input" id="username-div">
                            <label class="profile-label" for="username-input">Username</label><br>
                            <input id="username-input" type="text" placeholder="Username..." v-model="username" :readonly="!editing" />
                        </div>
                        <div class="rounded-input" id="email-div">
                            <label class="email-label" for="email-input">Email</label><br>
                            <input id="email-input" type="text" placeholder="Email..." v-model="email" :readonly="!editing" />
                        </div>
                    </div>
                    <div id="profilepic-div">
                        <img :src="userProfilePictureUrl" alt="profile-picture" id="profile-picture-preview">
                    </div>
                </div>
                <div id="bio-div-div">
                    <div class="rounded-input" id="bio-div">
                        <label class="bio-label" for="bio-input">Bio</label><br>
                        <textarea id="bio-input" rows="6" placeholder="Bio..." v-model="bio" :readonly="!editing" ></textarea>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
#user-email-picture-div {
    width: 100%;
    display: flex;
    margin-top: 3%;
}
#user-email-div {
    width: 60%;
    padding-left: 5%;
}
#profilepic-div {
    width: 35%;
    display: flex;
    align-items: center;
    justify-content: center;
}
#profile-picture-preview {
    width: 216px;
    height: 216px;
    border-radius: 50%;
    object-fit: cover;
    display: inline-block;
}
#bio-div-div {
    width: 100%;
    display: flex;
}
#bio-div {
    width: 100%;
    padding-left: 5%;
}
.rounded-input {
  margin-bottom: 1%;
  width: 100%;
}
.rounded-input label {
    font-size: 1.5em;
    font-weight: bold;
}
.rounded-input input {
  border-radius: 10px;
  background-color: white;
  width: 70%;
  height: 30px;
  padding: 10px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
  border-left: 10%;
}
.rounded-input textarea {
  border-radius: 10px;
  background-color: white;
  width: 90%;
  padding: 10px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
  border-left: 10%;
  font-family: 'Nunito Sans', sans-serif;
}
#view {
    display: flex;
    justify-content: space-around;
    height: 100vh;
}

#navbar {
    width: 20%;
}

#right-side {
    width: 80%;
    display: flex;
    flex-direction: column;
}

#topbar {
    height: 5%;
}

#content {
    background-color: #ADBC9F;
    height: 95%;
    /* justify-content: center; */
    align-items: center;
    display: flex;
    flex-direction: column;
}
</style>

<script>
import { getStorage, ref, getDownloadURL, uploadBytes } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-storage.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-auth.js";
import { getFirestore, collection, getDocs, addDoc, where, query, limit, setDoc, doc } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js";
import firebaseApp from "@/firebase";
import { useRouter } from "vue-router";

import Navbar from '@/components/Navbar.vue'
import TopBar from '@/components/TopBar.vue'

const db = getFirestore(firebaseApp);
const usernamesCollection = collection(db, "usernames");
const auth = getAuth(firebaseApp);
const storage = getStorage(firebaseApp);

export default {
    data() {
        return {
            pageName: "Profile",
            username: "",
            email: "",
            bio: "",
            userId: "",
            currentUser: null,
            userProfileDocId: null,
            userProfileDoc: null,
            userProfileDocData: null,
            userProfilePictureUrl: null,
            editing: false,
        }
    },
    components: {
        Navbar,
        TopBar
    },
    setup() {
        const router = useRouter();
        return { router };
    },
    async mounted() {
        await new Promise((resolve, reject) => {
            const unsubscribe = auth.onAuthStateChanged((user) => {
                unsubscribe();
                if (user) {
                    // User is signed in.
                    this.userId = user.uid;
                    this.currentUser = user;
                    resolve();
                } else {
                    // No user is signed in.
                    console.log("No user is signed in.");
                    reject(new Error("No user is signed in."));
                }
            });
        });
        // Check if User has a Profile
        try {
            console.log(this.userId);
            const profileQuery = query(
                usernamesCollection,
                where("userId", "==", this.userId)
            );
            const profileSnapshot = await getDocs(profileQuery);
            console.log("checked for profile");
            console.log(profileSnapshot.size);
            // Profile with userId exists
            if (profileSnapshot.size > 0) {
                // Retrieve user document and update details
                this.userProfileDoc = profileSnapshot.docs[0];
                this.userProfileDocId = this.userProfileDoc.id;
                this.userProfileDocData = this.userProfileDoc.data();
                console.log("User's Profile Document:", this.userProfileDoc);
                console.log("User's Profile Document ID:", this.userProfileDocId);
                this.bio = this.userProfileDocData.bio;
                this.username = this.userProfileDocData.username;
                this.email = this.userProfileDocData.email;
                // user has no Profile
            } else {
                this.$router.push("/home");
                return;
            }
        } catch (error) {
            console.log(error);
        };
        // Retrieve user profile picture
        const fileRef = ref(storage, `ProfilePictures/${this.userId}`);
        try {
            const userProfilePictureUrl = await getDownloadURL(fileRef);
            console.log("user profile picture ref: " + userProfilePictureUrl);
            this.userProfilePictureUrl = userProfilePictureUrl;
        } catch (error) {
            console.log(error);
        };
    }
}
</script>