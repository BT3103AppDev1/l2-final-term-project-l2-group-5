<template>
    <div id="view">
        <Navbar id="navbar" />
        <div id="right-side">
            <TopBar :pageName="pageName" id="topbar" />
            <div id="content">
                <!-- User information -->
                <div id="user-email-bio-div">
                    <div id="user-email-div">
                        <div class="rounded-input" id="username-div">
                            <label class="profile-label" for="username-input">Username</label><br>
                            <input id="username-input" type="text" placeholder="Username..." v-model="username" :readonly="!editing" />
                        </div>
                        <div class="rounded-input" id="email-div">
                            <label class="email-label" for="email-input">Email</label><br>
                            <input id="email-input" type="text" placeholder="Email..." v-model="email" readonly />
                        </div>
                        <div id="bio-div-div">
                            <div class="rounded-input" id="bio-div">
                                <label class="bio-label" for="bio-input">Bio</label><br>
                                <textarea id="bio-input" rows="6" placeholder="Bio..." v-model="bio" :readonly="!editing" ></textarea>
                            </div>
                        </div>
                        <!-- Buttons -->
                        <div id="button-div">
                            <button id="editButton" @click="toggleEdit">{{ editing ? 'Save' : 'Edit' }}</button>
                            <button v-if="editing" id="cancelButton" @click="cancel">Cancel</button>
                        </div>
                    </div>
                    <!-- Profile picture and chart -->
                    <div id="profile-picture-and-chart">
                        <!-- Profile picture -->
                        <div class="profile-picture-div">
                            <div v-if="editing" class="profile-picture-editing">
                                <img :src="userProfilePictureUrl" alt="profile-picture" id="profile-picture-preview-edit">
                                <div id="default-image-display">
                                    <div v-for="(image, index) in defaultPictureUrl" :key="index" class="default-image">
                                        <img :src="image" @click="selectImage(image, index)">
                                    </div>
                                </div>
                                <div id="image-upload-div">
                                    <p>Or Upload Your Own!</p>
                                    <!-- Input for uploading a new picture -->
                                    <input type="file" @change="handleImageUpload" accept="image/*">
                                </div>
                            </div>
                            <div v-else id="profilepic-div">
                                <img :src="userProfilePictureUrl" alt="profile-picture" id="profile-picture-preview">
                            </div>
                        </div>
                        <!-- Chart -->
                        <div id="chart-component">
                            <div v-if="editing"></div>
                            <div v-else>
                                <p id="chart-title">Activity Chart</p>
                                <pie-chart :data="chartData" 
                                    :library="{ responsive: true, maintainAspectRatio: false }" 
                                    :height="'300px'"
                                    :colors="['#436850', '#FBFADA', '#CDECDD']"
                                    :round="0"
                                    suffix="%"
                                    legend="bottom"
                                >
                                </pie-chart>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
#chart-component {
    margin-top: 15%;
    margin-left: -19%;
}
#chart-title{
    font-family: 'Nunito Sans', sans-serif;
    font-size: large;
    font-weight: bold;
    text-align: center;
}
#user-email-bio-div {
    width: 100%;
    display: flex;
    margin-top: 3%;
}
#user-email-div {
    width: 60%;
    padding-left: 5%;
}
#profile-picture-and-chart {
    margin-top: 1%;
    display: flex;
    width: 30%;
    flex-direction: column;
    align-items: flex-start;
}
#profilepic-div {
    width: 35%;
    display: flex;
    align-items: center;
    justify-content: center;
}
.profile-picture-editing {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    align-content:center;
}
#profile-picture-preview {
    width: 184px;
    height: 184px;
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
}
#bio-input{
    width:70%;
    font-family: 'Nunito Sans', sans-serif;
    font-size: medium;
}
#button-div {
    width: 100%;
}
#button-div button {
    background-color: #436850;
    border: none;
    border-radius: 10px;
    width: 20%;
    height: 40px;
    padding: 10px;
    color: white;
    text-align: center;
    display: block;
    margin-top:5%;
    cursor: pointer;
    float: left;
    font-family: 'Nunito Sans', sans-serif;
    font-size: medium;
}
#cancelButton {
    margin-left:5%;
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
  font-family: 'Nunito Sans', sans-serif;
  font-size: medium;
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
.profile-picture-div {
    width: 35%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
#default-image-display {
    margin-top: 2%;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
}
#image-upload-div p {
    margin: 1%;
}
.default-image {
    height: 85%;
    width: 15%;
    margin: 1%;
}
.default-image img {
    height: 100%;
    width: 100%;
}
#profile-picture-preview-edit {
    height: 184px;
    width: 184px;
    border-radius: 50%;
    object-fit: cover;
    display: inline-block;
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
import { getFirestore, collection, getDocs, updateDoc, where, query, doc } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js";
import firebaseApp from "@/firebase";
import { useRouter } from "vue-router";
import 'chartkick/chart.js'

import Navbar from '@/components/Navbar.vue';
import TopBar from '@/components/TopBar.vue';

import Boy from "@/assets/profile-pictures/boy.png";
import Girl from "@/assets/profile-pictures/girl.png";
import Cat from "@/assets/profile-pictures/cat.png";
import Dog from "@/assets/profile-pictures/dog.png";
import Alien from "@/assets/profile-pictures/alien.png";

const db = getFirestore(firebaseApp);
const usernamesCollection = collection(db, "usernames");
const auth = getAuth(firebaseApp);
const storage = getStorage(firebaseApp);

export default {
    data() {
        return {
            pageName: "Profile",
            oldUsername: "",
            oldBio: "",
            username: "",
            email: "",
            bio: "",
            userId: "",
            currentUser: null,
            userProfileDocId: null,
            userProfileDoc: null,
            userProfileDocData: null,
            editing: false,
            userProfilePictureUrl: null,
            oldPicture: null,
            isProfilePicDefault: false,
            selectedIndex: null,
            userFile: null,
            defaultPictureRefs: [
                "ProfilePictures/boy.png",
                "ProfilePictures/girl.png",
                "ProfilePictures/cat.png",
                "ProfilePictures/dog.png",
                "ProfilePictures/alien.png",
            ],
            defaultFiles: [Boy, Girl, Cat, Dog, Alien],
            defaultPictureUrl: [],
            chartData: [],
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
    methods: {
        async toggleEdit() {
            if (this.editing) {
                console.log("trying to save new profile");
                try {
                    // Check if username is ok
                    if (this.oldUsername != this.username) {
                        const usernameQuery = query(
                            usernamesCollection,
                            where("username", "==", this.username)
                        );
                        const usernameSnapshot = await getDocs(usernameQuery);
                        if (usernameSnapshot.size > 0) {
                            alert("Username is already in use. Please use a different username.");
                            this.username = this.oldUsername;
                            return;
                        }
                    }
                    // Update profile info
                    const docRef = doc(usernamesCollection, this.userProfileDocId);
                    await updateDoc(docRef, {
                        username: this.username,
                        email: this.email,
                        bio: this.bio,
                    })
                    // Change profile picture
                    if (this.oldPicture != this.userProfilePictureUrl) {
                        if (this.isProfilePicDefault) {
                            const response = await fetch(`${this.defaultFiles[this.selectedIndex]}`);
                            const imageBlob = await response.blob();
                            const fileRef = ref(storage, `ProfilePictures/${this.userId}`);
                            const snapshot = await uploadBytes(fileRef, imageBlob);
                            console.log("Uploaded a blob or file!", snapshot);
                        } else {
                            const fileRef = ref(storage, `ProfilePictures/${this.userId}`);
                            const snapshot = await uploadBytes(fileRef, this.userFile);
                            console.log("Uploaded a blob or file!", snapshot);
                        }
                    }
                    // Change back mode after successful change
                    this.oldUsername = this.username;
                    this.oldBio = this.bio;
                    this.oldPicture = this.userProfilePictureUrl;
                    this.editing = !this.editing;
                    window.location.reload();
                } catch (error) {
                    console.error(error);
                }
            } else {
                console.log("going into edit mode");
                this.editing = !this.editing;
            }
        },
        cancel() {
            console.log("cancel edit");
            this.username = this.oldUsername;
            this.bio = this.oldBio;
            this.userProfilePictureUrl = this.oldPicture;
            this.editing = !this.editing;
        },
        // Get default profile pictures
        async fetchDefaultPictures() {
            for (let defaultPicturePath of this.defaultPictureRefs) {
                const defaultPictureRef = ref(storage, defaultPicturePath);
                try {
                    const url = await getDownloadURL(defaultPictureRef);
                    this.defaultPictureUrl.push(url);
                } catch (error) {
                    console.error("Error fetching image URL:", error);
                }
            }
            this.imageUrl = this.defaultPictureUrl[0];
            this.selectedIndex = 0;
        },
        // Set the selected image URL
        selectImage(imageUrl, index) {
            this.userProfilePictureUrl = imageUrl;
            this.selectedIndex = index;
            this.isProfilePicDefault = true;
        },
        // User inputs profile picture
        handleImageUpload(event) {
            const file = event.target.files[0];
            if (file && file.type.startsWith("image/")) {
                this.userFile = file;
                this.userProfilePictureUrl = URL.createObjectURL(file);
                this.isProfilePicDefault = false;
            } else {
                console.error("The selected file is not an image.");
                this.userFile = null;
            }
        },
        async fetchUserActivity() {
            try {
                const db = getFirestore();
                const commentsQuery = query(collection(db, 'comments'), where('userId', '==', this.userId));
                const postsQuery = query(collection(db, 'posts'), where('userId', '==', this.userId));
                const userQuery = query(collection(db, 'usernames'), where('userId', '==', this.userId));
                const userSnapshot = await getDocs(userQuery);
                const userDocRef = userSnapshot.docs[0].ref;
                const diaryQuery = query(collection(userDocRef, 'diary'));
                
                const [commentsSnapshot, postsSnapshot, diarySnapshot] = await Promise.all([
                    getDocs(commentsQuery),
                    getDocs(postsQuery),
                    getDocs(diaryQuery)
                ]);
                console.log(diarySnapshot);
                const commentsCount = commentsSnapshot.size;
                const postsCount = postsSnapshot.size;
                const diaryCount = diarySnapshot.size;

                const totalEntries = commentsCount + postsCount + diaryCount;

                const commentsPercentage = (commentsCount / totalEntries) * 100;
                const postsPercentage = (postsCount / totalEntries) * 100;
                const diaryPercentage = (diaryCount / totalEntries) * 100;

                this.chartData = [
                    ['Comments', commentsPercentage],
                    ['Posts', postsPercentage],
                    ['Diary Entries', diaryPercentage]
                ];
            } catch (error) {
                console.error('Error fetching user activity:', error);
            }
        },
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
                this.oldBio = this.userProfileDocData.bio;
                this.username = this.userProfileDocData.username;
                this.oldUsername = this.userProfileDocData.username;
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
            this.oldPicture = userProfilePictureUrl;
        } catch (error) {
            console.log(error);
        };
        // Make default picture urls
        this.fetchDefaultPictures();
        // Fetch user activity chart
        this.fetchUserActivity();
    }
}
</script>