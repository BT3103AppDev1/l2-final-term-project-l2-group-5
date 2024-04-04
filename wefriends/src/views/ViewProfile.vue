<template>
    <div id="view">
        <Navbar id="navbar" />
        <div id="right-side">
            <TopBar :pageName="pageName" id="topbar" />
            <div id="content">
                <div>
                    <img :src="profilePictureUrl" alt="profile-picture" id="profile-picture-preview">
                </div>
                <div>
                    <h2>Username: </h2>
                    <p>{{ username }}</p>
                </div>
                <div>
                    <h2>Bio: </h2>
                    <p>{{ bio }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
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

#profile-picture-preview {
    width: 144px;
    height: 144px;
    border-radius: 50%;
    object-fit: cover;
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
    props: {
        username: String,
    },
    data() {
        return {
            pageName: "ViewProfile",
            bio: "",
            profileDocId: null,
            profileDoc: null,
            profileDocData: null,
            profilePictureUrl: null,
            profileUserId: null,
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
        // Check if User has a Profile
        try {
            console.log(this.userId);
            const profileQuery = query(
                usernamesCollection,
                where("username", "==", this.username)
            );
            const profileSnapshot = await getDocs(profileQuery);
            console.log("checked for profile");
            console.log(profileSnapshot.size);
            // Profile with userId exists
            if (profileSnapshot.size > 0) {
                // Retrieve user document and update details
                this.profileDoc = profileSnapshot.docs[0];
                this.profileDocId = this.profileDoc.id;
                this.profileDocData = this.profileDoc.data();
                console.log("User's Profile Document:", this.profileDoc);
                console.log("User's Profile Document ID:", this.profileDocId);
                this.bio = this.profileDocData.bio;
                this.profileUserId = this.profileDocData.userId;
            // user has no Profile
            } else {
                this.$router.push("/profilenotfound");
                return;
            }
        } catch (error) {
            console.log(error);
        };
        // Retrieve user profile picture
        const fileRef = ref(storage, `ProfilePictures/${this.profileUserId}`);
        try {
            const profilePictureUrl = await getDownloadURL(fileRef);
            console.log("user profile picture ref: " + profilePictureUrl);
            this.profilePictureUrl = profilePictureUrl;
        } catch (error) {
            console.log(error);
        };
    }
}
</script>