<template>
    <div id="view" v-if="profile">
        <Navbar id="navbar" />
        <div id="right-side">
            <TopBar :pageName = "pageName" id="topbar"/>
            <div id="content">
                <div id="main">
                    <div id="main-container">
                        <div class="quote-container">
                            <p class="quote">{{quote}}</p>
                        </div>
                        <div id="content-container">
                            <div id="prompt-container">
                                <h1>Today's Prompt</h1>
                                <img src="../assets/diary-prompt-img.png" alt="Diary prompt image" class="prompt-img">
                                <p id="prompt-title">{{prompt_title}}</p>
                                <p id="prompt-desc">{{prompt_body}}</p>
                                <div class="text-input" >
                                    <form id="text-form">
                                        <textarea placeholder="Type Here..." id="description"></textarea>
                                        <button type="button" id="submit-button" v-on:click="save">></button>
                                    </form>
                                </div>
                            </div>
                            <div id="post-container">
                                <div id="trending-post">
                                    <div id="post-header">
                                        <h1 id="heading-text">Trending Discussion </h1>
                                        <select v-model="selectedOption" id="dropdown">
                                            <option v-for="option in options" :value="option.value" :key="option.value">
                                                {{ option.text }}
                                            </option>
                                        </select>
                                    </div>
                                    <ul>
                                        <li v-for="(item, index) in topPosts" :key="index" class="post-title-box">
                                            <p>{{ item.title }}</p>
                                            {{ truncateText(item.body,300) }}
                                        </li>
                                    </ul>                        
                                </div>
                            </div>
                        </div>
                    </div>    
                </div>
            </div>
        </div>
    </div>
    <div v-else>
        <h1>There is no profile</h1>
        <form @submit.prevent="createProfile">
            <div class="rounded-input">
                <input type="text" placeholder="Username..." v-model="username" />
            </div>
            
            <button type="submit" id="button" :disabled="fieldsFilled" :class="{'disabled-button':fieldsFilled}">Create Profile</button>
        </form>
    </div>
    
</template>

<style>
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
    height: 90%;
}

#main {
    position: flex;
}

.quote-container {
    position: relative;
    max-width: 90%; 
    background-color: #fffee5; 
    border-radius: 25px; 
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); 
    margin: auto; 
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
    flex: 1;
    margin-left: 5%;
    margin-right: 2.5%;
    padding: 0px 20px 20px 20px;
    background-color: white;
    border-radius: 25px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

#prompt-title {
    font-size: 24px;
    font-weight: bold;
    margin-top: 10px;
    color: #ADBC9F;
}

#prompt-desc {
    margin-top: -20px;
    font-size: 16px;
    color: #436850;
    text-align: justify;
}

#post-container {
    flex: 2;
    margin-right: 5%;
    text-align: center;
}

.prompt-img {
    width: 100%;
    height: auto;
}

.text-input {
    display: flex;
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
    width: 100%;
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
import firebaseApp from '@/firebase'
import { getFirestore, collection, getDocs, addDoc, where, query, limit, setDoc, doc} from 'https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'https://www.gstatic.com/firebasejs/9.0.2/firebase-auth.js';
import Navbar from '@/components/Navbar.vue'
import TopBar from '@/components/TopBar.vue'

const db = getFirestore(firebaseApp);
const usernamesCollection = collection(db, 'usernames');
const auth = getAuth(firebaseApp);

export default {
    data() {
        return {
            selectedOption: 'option1',
            options: [
                { value: 'option1', text: 'Past 24 Hours' },
                { value: 'option2', text: 'Past 1 Day' },
            ],
            topPosts: [],
            pageName: "Home",
            quote: "",
            prompt_title: "",
            prompt_body: "",
            profile: false,
            username: '',
            userId: '',
            currentUser: null,
        };
    },
    computed: {
        fieldsFilled() {
        return !(this.username);
        },
    },
    async mounted() {
        await new Promise((resolve, reject) => {
            const unsubscribe = auth.onAuthStateChanged(user => {
            unsubscribe();
            if (user) {
                // User is signed in.
                this.userId = user.uid;
                resolve();
            } else {
                // No user is signed in.
                console.log("No user is signed in.");
                reject(new Error("No user is signed in."));
            }
            });
        });

        try {
            console.log(this.userId)
            const profileQuery = query(usernamesCollection, where('userId', '==', this.userId));
            const profileSnapshot = await getDocs(profileQuery);
            console.log("checked for profile")
            console.log(profileSnapshot.size)
            // Profile with userId exists
            if (profileSnapshot.size > 0) {
              this.profile = true;
            } else {
                return;
            }
        } catch (error) {
            console.log(error);
        }

        try {
            const querySnapshot = await getDocs(query(collection(db, 'posts'), limit(3)));
            querySnapshot.forEach((doc) => {
                const postData = {
                    body: doc.data().body,
                    tag: doc.data().tag,
                    timestamp: doc.data().timestamp.toDate(),
                    title: doc.data().title,
                };
                this.topPosts.push(postData);
            });
        } catch (error) {
            console.error(error);
        }

        try {
            const querySnapshot = await getDocs(query(collection(db, 'quotes'), limit(1))); // apply some filter or some logic to get a new quote
            querySnapshot.forEach((doc) => {
                this.quote = doc.data().quote;
            });
        } catch (error) {
            console.error(error);
        }

        try {
            const querySnapshot = await getDocs(query(collection(db, 'prompts'), limit(1))); // apply some filter or some logic to get a new prompt
            querySnapshot.forEach((doc) => {
                this.prompt_title = doc.data().title;
                this.prompt_body= doc.data().body;
            });
        } catch (error) {
            console.error(error);
        }
    },
    methods: {
        truncateText(text, length) {
            if (text.length <= length) return text;
                return text.substring(0, length) + '...';
        },
        async save() {
            console.log("saving")
            let title = new Date().toLocaleDateString();
            let description = document.getElementById("description").value

            alert("posting diary entry")
            try {
                const docRef = await setDoc(doc(db, "Diary", title),{
                    Title: title, Description: description
                })
                console.log(docRef)
                document.getElementById('text-form').reset();
                // somehow this is very very important guys
                this.$emit("added")
            } catch(error) {
                console.log("Error1!!:", error);
            }
        },
        async createProfile() {
            console.log("attempting to create profile")
            auth.onAuthStateChanged((user) => {
                if (user) {
                    this.currentUser = user
                } else {
                    console.log("No user is signed in.");
                }
            });
            try {
                const usernameQuery = query(usernamesCollection, where('username', '==', this.username));
                const usernameSnapshot = await getDocs(usernameQuery);
                
                if (usernameSnapshot.size > 0) {
                  alert('Username is already in use. Please use a different username.');
                  this.username = '';
                  return;
                }

                await updateProfile(this.currentUser, { displayName: this.username });
                await addDoc(usernamesCollection, { userId: this.userId, username: this.username });

                console.log("doc added")
                this.username = '';
                window.location.reload();

            } catch (error) {
                alert(error.message);
            }
        }
    },
    components: {
        Navbar,
        TopBar
    }
}
</script>