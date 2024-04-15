<template>
  <div id="view" v-if="profile">
    <Navbar id="navbar" />
    <div id="right-side">
      <TopBar :pageName="pageName" id="topbar" />
      <div id="content">
        <div id="main">
          <div id="main-container">
            <div class="quote-container">
              <p class="quote">{{ quote.text }} - {{ quote.author }}</p>
            </div>
            <div id="content-container">
              <div id="prompt-container">
                <div v-if="!hasEntryToday" id="entry-exists">
                  <div id="daily-prompt">
                    <h1>Today's Prompt</h1>
                    <img
                      src="../assets/home/pet-img.png"
                      alt="Diary prompt image"
                      class="prompt-img"
                    />
                    <p id="prompt-title">{{ prompt_title }}</p>
                    <p id="prompt-desc">{{ prompt_body }}</p>
                  </div>
                  <div class="text-input">
                    <form id="text-form">
                      <textarea
                        placeholder="Type Here..."
                        v-model="description"
                      ></textarea>
                      <button type="button" id="submit-button" @click="save">
                        >
                      </button>
                    </form>
                  </div>
                </div>
                <div v-else>
                  <h2>Today's entry:</h2>
                  <div class="entry-display">
                    <p>{{ todaysEntry.Description }}</p>
                  </div>
                </div>
              </div>
              <div id="post-container">
                <div id="trending-post">
                  <div id="post-header">
                    <h1 id="heading-text">Trending Discussion</h1>
                    <select v-model="selectedOption" id="dropdown">
                      <option
                        v-for="option in options"
                        :value="option.value"
                        :key="option.value"
                      >
                        {{ option.text }}
                      </option>
                    </select>
                  </div>
                </div>
                <div class="postDisplayContainer">
                  <PostDisplay :displayedPosts="displayedPosts" />
                </div>
                <div class="forum-prompt">
                  <router-link to="/forum" class="forum-link">See More</router-link>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- User has no profile -->
  <div v-if="noProfile">
    <div id="left-half">
      <img src="../assets/bckgrnd-img.png" alt="bckgrnd-img" />
    </div>
    <div id="right-box">
      <h1 class="intro-text">Welcome!</h1>
      <h2 class="intro-text">Let's Create Your Profile!</h2>
      <div v-if="imageUrl" class="profile-picture-div">
        <img :src="imageUrl" alt="Preview" class="profile-picture-preview" />
      </div>
      <div id="toggle-menu">
        <p>Choose a Profile Picture</p>
        <!-- List of default profile pictures -->
        <div id="default-image-display">
          <div
            v-for="(image, index) in defaultPictureUrl"
            :key="index"
            class="default-image"
          >
            <img :src="image" @click="selectImage(image, index)" />
          </div>
        </div>
        <p>Or Upload Your Own!</p>
        <!-- Input for uploading a new picture -->
        <input type="file" @change="handleImageUpload" accept="image/*" />
      </div>
      <form @submit.prevent="createProfile">
        <div class="rounded-input">
          <label class="profile-label" for="username-input">Username:</label
          ><br />
          <input
            id="username-input"
            type="text"
            placeholder="Username..."
            v-model="username"
          />
        </div>
        <div class="rounded-input">
          <label class="profile-label" for="bio-input">Bio:</label><br />
          <textarea
            id="bio-input"
            rows="6"
            placeholder="Bio..."
            v-model="bio"
          ></textarea>
        </div>
        <button
          type="submit"
          id="button"
          :disabled="fieldsFilled"
          :class="{ 'disabled-button': fieldsFilled }"
        >
          Create Profile
        </button>
      </form>
      <div class="nav-option" @click="showModal = true">
        <img src="@/assets/navbar/logout.png" alt="logout-icon" />
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

.forum-link {
  background-color: #436850;
  border: none;
  border-radius: 10px;
  padding: 5px 10px 5px 10px;
  color: white;
  text-align: center;
  cursor: pointer;
  float: right;
  margin-right: 1.5%;
}

.forum-link:hover {
  background-color: #12372a;
}

.post-content {
  margin-bottom: 10px;
  position: relative;
}

.truncated {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
/* Create Profile Styles */
#left-half {
  position: absolute;
  left: 0;
  width: 50%;
  height: 150%;
  background-color: #436850;
  padding: 20px;
}

.tag-container {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}

.tag {
  padding: 5px 10px;
  border-radius: 20px;
  margin-right: 10px;
  margin-bottom: 10px;
  font-size: 14px;
  color: white;
}

.Happy {
  background-color: #4caf50;
}

.Sad {
  background-color: #ffc0cb;
}

.Neutral {
  background-color: #4682b4;
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
  height: 150%;
  background-color: #fbfaf0;
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

.rounded-input textarea {
  border-radius: 10px;
  background-color: white;
  width: 80%;
  /* height: 30px; */
  padding: 10px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
  border-left: 10%;
}

.rounded-input {
  margin-left: 10%;
  margin-bottom: 1%;
}

.intro-text {
  margin-left: 10%;
}

.profile-picture-div {
  display: flex;
  justify-content: center;
}

.profile-picture-preview {
  width: 144px;
  height: 144px;
  border-radius: 50%;
  object-fit: cover;
}

#change-profile-picture-btn {
  background-color: #436850;
  border: none;
  border-radius: 10px;
  width: 30%;
  height: 40px;
  padding: 10px;
  color: white;
  text-align: center;
  display: block;
  margin: 10px auto;
  cursor: pointer;
}
#toggle-menu {
  margin-top: 2%;
  margin-bottom: 5%;
}
#toggle-menu p {
  margin: 0;
  margin-left: 21%;
}

#toggle-menu input {
  margin-left: 21%;
  margin-top: 1%;
}

#default-image-display {
  display: flex;
  justify-content: center;
  align-items: center;
}

.default-image {
  height: 10%;
  width: 10%;
  margin: 1%;
}

.default-image img {
  height: 100%;
  width: 100%;
}

#button {
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

#button.disabled-button {
  background-color: #e4e4e4;
  cursor: not-allowed;
}

.nav-option {
  display: flex;
  align-items: center;
  margin-top: 30%;
  cursor: pointer;
  justify-content: center;
  width: 30%;
  margin-left: 35%;
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

/* Home Page Styles */
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
  background-color: #adbc9f;
  height: 95%;
}

#main {
  position: flex;
}

.quote-container {
  position: relative;
  background-color: #fffee5;
  border-radius: 25px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-left: 2.5%;
  margin-right: 2.5%;
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Arial, sans-serif;
}

.quote {
  text-align: center;
  font-size: 32px;
  color: #12372a;
  font-style: italic;
  font-weight: bold;
}

#content-container {
  display: flex;
}

#prompt-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1;
  margin-left: 2.5%;
  margin-right: 2.5%;
  padding: 20px;
  background-color: white;
  border-radius: 25px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-height: 70vh;
  /* Set maximum height to 80% of viewport height */
}

.entry-display {
  overflow-y: auto;
  /* Enable vertical scrolling for the entry-display div */
  max-height: 60vh;
  /* Adjust as needed */
  padding-right: 10px;
  text-align: justify;
}

/* Adjusted scrollbar styles */
.entry-display::-webkit-scrollbar {
  width: 8px;
  /* Width of the scrollbar */
}

.entry-display::-webkit-scrollbar-track {
  background: transparent;
}

.entry-display::-webkit-scrollbar-thumb {
  background: #888;
  /* Thumb color */
  border-radius: 4px;
  /* Rounded corners */
}

.entry-display::-webkit-scrollbar-thumb:hover {
  background: #555;
  /* Thumb color on hover */
}

#daily-prompt {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

#prompt-title {
  font-size: 24px;
  font-weight: bold;
  margin-top: 10px;
  color: #adbc9f;
}

#prompt-desc {
  margin-top: -20px;
  font-size: 16px;
  color: #436850;
  text-align: justify;
}

#post-container {
  flex: 2;
  margin-right: 2.5%;
}

.prompt-img {
  width: 100%;
  height: auto;
  object-fit: contain;
}

.text-input {
  border-radius: 10px;
  border: 1px solid black;
}

.text-input textarea {
  background-color: white;
}

#text-form {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
}

textarea {
  width: 95%;
  border: none;
  border-radius: 10px;
  outline: none;
  padding-left: 10px;
  padding-top: 10px;
  font-family: Arial, sans-serif;
}

#submit-button {
  background-color: #acd4e7;
  color: white;
  text-align: center;
  display: inline-block;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin: 1%;
  border: none;
  font-weight: bold;
  font-size: 16px;
}

#submit-button:hover {
  background-color: #88b6d1;
}

textarea {
  overflow-wrap: break-word;
  resize: none;
}

button {
  align-self: flex-end;
}

#post-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: -5;
}

#dropdown {
  padding: 10px 15px;
  border-radius: 10px;
  border: 1px solid #ccc;
  background-color: #fff;
}

.post-title-box {
  background-color: white;
  padding: 10px 15px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  list-style-type: none;
}

ul {
  padding-left: 0;
}
</style>

<script>
import PostDisplay from "@/components/PostDisplay.vue";

import firebaseApp from "@/firebase";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  where,
  query,
  limit,
  orderBy,
  Timestamp,
} from "https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js";
import {
  getAuth,
  updateProfile,
} from "https://www.gstatic.com/firebasejs/9.0.2/firebase-auth.js";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytes,
} from "https://www.gstatic.com/firebasejs/9.0.2/firebase-storage.js";
import { useRouter } from "vue-router";

import Navbar from "@/components/Navbar.vue";
import TopBar from "@/components/TopBar.vue";
import Confirmation from "@/components/Confirmation.vue";

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
      selectedOption: "option2",
      options: [
        { value: "option1", text: "Past 24 Hours" },
        { value: "option2", text: "Past 7 Days" },
        { value: "option3", text: "Past 30 Days" },
      ],
      topPosts: [],
      userProfileDocId: null,
      pageName: "Home",
      description: "",
      quote: "",
      prompt_title: "",
      prompt_body: "",
      profile: null,
      noProfile: null,
      username: "",
      bio: "",
      userId: "",
      userEmail: "",
      currentUser: null,
      defaultPictureUrl: [],
      defaultPictureRefs: [
        "ProfilePictures/boy.png",
        "ProfilePictures/girl.png",
        "ProfilePictures/cat.png",
        "ProfilePictures/dog.png",
        "ProfilePictures/alien.png",
      ],
      defaultFiles: [Boy, Girl, Cat, Dog, Alien],
      userFile: null,
      imageUrl: null,
      isProfilePicDefault: true,
      selectedIndex: null,
      showModal: false,
      todaysEntry: null,
      hasEntryToday: false,
    };
  },
  watch: {
  selectedOption(newOption) {
    this.topPosts = [];
    this.getTopPosts(newOption);
  }
  },
  computed: {
    fieldsFilled() {
      return !(this.username && this.imageUrl && this.bio);
    },
    displayedPosts() {
      console.log("hi");
      console.log(this.topPosts);
      return this.topPosts;
    },
  },
  setup() {
    const router = useRouter();
    return { router };
  },
  async mounted() {
    this.getTopPosts(this.selectedOption);
    // Retrieve User Details
    await new Promise((resolve, reject) => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        unsubscribe();
        if (user) {
          // User is signed in.
          this.userId = user.uid;
          this.userEmail = user.email;
          resolve();
        } else {
          // No user is signed in.
          console.log("No user is signed in.");
          this.$router.push("/");
          return;
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
        this.profile = true;
        const userProfileDoc = profileSnapshot.docs[0];
        const userProfileDocId = userProfileDoc.id;
        console.log("User's Profile Document ID:", userProfileDocId);
        this.userProfileDocId = userProfileDocId;
        // user has no Profile
      } else {
        this.noProfile = true;
        this.fetchDefaultPictures();
        return;
      }
    } catch (error) {
      console.log(error);
    }

    try {
      const querySnapshot = await getDocs(
        query(collection(db, "prompts"), limit(1))
      );
      querySnapshot.forEach((doc) => {
        this.prompt_title = doc.data().title;
        this.prompt_body = doc.data().body;
      });
    } catch (error) {
      console.error(error);
    }
    await this.checkForTodaysEntry();
    this.fetchQuotes();
  },
  methods: {
    formatDateFirebase(dateString) {
      const date = new Date(dateString);
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      const formattedDay = day < 10 ? `0${day}` : day;
      const formattedMonth = month < 10 ? `0${month}` : month;

      const formattedDate = `${formattedDay}/${formattedMonth}/${year}`;

      return formattedDate;
    },
     getNDaysAgoTimestamp(days) {
      const date = new Date();
      date.setDate(date.getDate() - days);
      return date.getTime();
    },
    async checkForTodaysEntry() {
      const title = new Date().toLocaleDateString();

      const entriesRef = collection(
        db,
        "usernames",
        this.userProfileDocId,
        "diary"
      );
      const q = query(entriesRef, where("Title", "==", title));

      try {
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const todaysEntry = querySnapshot.docs[0].data();
          this.todaysEntry = todaysEntry;
          console.log(todaysEntry);
          this.hasEntryToday = true;
        } else {
          this.hasEntryToday = false;
        }
        console.log("Today's entry:", this.hasEntryToday);
      } catch (error) {
        console.error("Error fetching today's entry:", error);
      }
    },

    async save() {
      let title = new Date().toLocaleDateString();
      title = this.formatDateFirebase(title);

      const description = this.description;
      try {
        const entry = {
          Title: title,
          Description: description,
        };
        this.description = "";
        const userEntriesSubcollectionPath = collection(
          db,
          "usernames",
          this.userProfileDocId,
          "diary"
        );
        const docRef = await addDoc(userEntriesSubcollectionPath, entry);
        console.log("Document written with ID: ", docRef.id);
        this.todaysEntry = entry;
        this.hasEntryToday = true;
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    },
    // create the user profile
    async createProfile() {
      console.log("attempting to create profile");
      auth.onAuthStateChanged((user) => {
        if (user) {
          this.currentUser = user;
        } else {
          console.log("No user is signed in.");
        }
      });
      try {
        const usernameQuery = query(
          usernamesCollection,
          where("username", "==", this.username)
        );
        const usernameSnapshot = await getDocs(usernameQuery);
        if (usernameSnapshot.size > 0) {
          alert("Username is already in use. Please use a different username.");
          this.username = "";
          return;
        }
        await updateProfile(this.currentUser, { displayName: this.username });
        await addDoc(usernamesCollection, {
          userId: this.userId,
          email: this.userEmail,
          username: this.username,
          bio: this.bio,
        });
        console.log("doc added");
        this.username = "";
        this.bio = "";
        // upload profile picture
        if (this.isProfilePicDefault) {
          const response = await fetch(
            `${this.defaultFiles[this.selectedIndex]}`
          );
          const imageBlob = await response.blob();
          const fileRef = ref(storage, `ProfilePictures/${this.userId}`);
          const snapshot = await uploadBytes(fileRef, imageBlob);
          console.log("Uploaded a blob or file!", snapshot);
        } else {
          const fileRef = ref(storage, `ProfilePictures/${this.userId}`);
          const snapshot = await uploadBytes(fileRef, this.userFile);
          console.log("Uploaded a blob or file!", snapshot);
        }
        window.location.reload();
      } catch (error) {
        alert(error.message);
      }
    },
    logout() {
      auth
        .signOut()
        .then(() => {
          console.log("Logged out");
          this.$router.push("/");
        })
        .catch((error) => {
          console.error("Sign Out Error", error);
        });
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
    // User inputs profile picture
    handleImageUpload(event) {
      const file = event.target.files[0];
      if (file && file.type.startsWith("image/")) {
        this.userFile = file;
        this.imageUrl = URL.createObjectURL(file);
        this.isProfilePicDefault = false;
      } else {
        console.error("The selected file is not an image.");
        this.userFile = null;
      }
    },
    // Set the selected image URL
    selectImage(imageUrl, index) {
      this.imageUrl = imageUrl;
      this.selectedIndex = index;
      this.isProfilePicDefault = true;
    },
    hashCode(s) {
      let hash = 0;
      for (let i = 0; i < s.length; i++) {
        const char = s.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash &= hash; // Convert to 32bit integer
      }
      return hash;
    },
    fetchQuotes() {
      fetch("https://type.fit/api/quotes")
        .then((response) => response.json())
        .then((data) => {
          this.quotes = data;
          this.getDailyQuote();
        })
        .catch((error) => {
          console.error("Error fetching quotes:", error);
          // Assign a fallback quote directly
          this.quote = { text: "Don't be sad, be happy!", author: "Unknown" };
        });
    },
    getDailyQuote() {
      if (this.quotes.length > 0) {
        const currentDate = new Date().toISOString().slice(0, 10);
        const hashedDate = this.hashCode(currentDate);
        const index = Math.abs(hashedDate) % this.quotes.length;
        this.quote = this.quotes[index];
        let quote = { ...this.quotes[index] };

        // Check if the author exists and replace ", type.fit" with an empty string
        if (quote.author) {
          quote.author = quote.author.replace(", type.fit", "");
        }

        this.quote = quote;
      }
    },

    async getTopPosts(selectedOption) {
      console.log(selectedOption);
      try {
        if (selectedOption === 'option1') {
          // For option1, set days to 1
          this.days = 1;
        } else if (selectedOption === 'option2') {
          // For option2, set days to 7
          this.days = 7;
        } else if (selectedOption === 'option3') {
          // For option3, set days to 30
          this.days = 30;
        }
        const nDaysAgoDate = Timestamp.fromDate(new Date(Date.now() - this.days * 24 * 60 * 60 * 1000));
        console.log(nDaysAgoDate);
        const querySnapshot = await getDocs(
          query(
            collection(db, "posts"),
            where("timestamp", ">=", nDaysAgoDate), // Filter for recent posts
            orderBy("timestamp", "desc"), // You might want to order by timestamp or keep as is
            orderBy("upvotes", "desc"), // Order by upvotes
            limit(50) // Limit to the top 3 posts
          )
        );

        const posts = querySnapshot.docs.map(doc => doc.data());
        posts.sort((a, b) => b.upvotes - a.upvotes);
        const topTwoPosts = posts.slice(0, 2);

        topTwoPosts.forEach((doc) => {
          const postData = doc
          
          this.topPosts.push(postData);
        });
        } catch (error) {
        console.error(error);
        }
    },
  },
  components: {
    Navbar,
    TopBar,
    Confirmation,
    PostDisplay,
  },
};
</script>
