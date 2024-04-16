<template>
  <div class="modal-wrapper" v-show="showModal">
    <div class="modal">
      <div class="modal-content">
        <div class="modal-header">
          <span class="close" @click="closeModal">X</span>
        </div>
        <div class="create-header">Create Discussion</div>
        <div class="input-container">
          <input type="text" v-model="title" :maxlength="titleMaxLength" placeholder="Title (Required)" class="rounded-input">
        </div>
        <div class="input-container">
          <textarea v-model="body" :maxlength="bodyMaxLength" placeholder="Content (Required)" class="rounded-input" id="body"></textarea>
        </div>
        <div class="tag-section">
          <p class="tag-header">Tags (2 Max):</p>
            <div class="tag-container">
              <span v-for="tag in tags" :key="tag" :class="[tag, 'tag', { active: selectedTags.includes(tag), disabled: selectedTags.length >= 2 && !selectedTags.includes(tag) }]" @click="toggleTag(tag)">{{ tag }}</span>
            </div>
        </div>
        <div class="button-div">
          <button @click="createPost" class="create-button">Create</button>
          <span class="error-msg" v-if="showErrorMessage">Title and Content are required fields.</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getFirestore, collection, addDoc, serverTimestamp, getDocs } from 'https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.0.2/firebase-auth.js';

export default {
  data() {
    return {
      showModal: false,
      title: '',
      body: '',
      selectedTags: [],
      tags: ['Happy', 'Sad', 'Neutral', 'Rant', 'Tips', 'Help'],
      numberOfPosts: 0,
      showErrorMessage: false,
      titleMaxLength: 90,
      bodyMaxLength: 500
    };
  },
  async created() {
    try {
      const db = getFirestore();
      const postsCollection = collection(db, 'posts');
      const querySnapshot = await getDocs(postsCollection);
      this.numberOfPosts = querySnapshot.size;
    } catch (error) {
      console.error('Error fetching number of posts:', error);
    }
  },
  methods: {
    openModal() {
      this.showModal = true;
    },
    closeModal() {
      this.resetFields();
      this.showModal = false;
    },
    resetFields() {
      this.title = '';
      this.body = '';
      this.selectedTags = [];
      this.showErrorMessage = false;
    },
    toggleTag(tag) {
      if (this.selectedTags.includes(tag)) {
        this.selectedTags = this.selectedTags.filter(t => t !== tag);
      } else {
        if (this.selectedTags.length < 2) {
          this.selectedTags.push(tag);
        } else {
          // If already 2 tags selected, do nothing
          return;
        }
      }
    },
    async createPost() {
      if (this.title.trim() === '' || this.body.trim() === '') {
        this.showErrorMessage = true;
        return;
      }

      const currentUser = getAuth().currentUser;

      const post = {
        id: (this.numberOfPosts + 1).toString(),
        title: this.title,
        body: this.body,
        selectedTags: [],
        tag1: this.selectedTags[0],
        tag2: this.selectedTags.length === 2 ? this.selectedTags[1] : null,
        userId: currentUser.uid,
        username: currentUser.displayName,
        upvotes: 0,
        downvotes: 0,
        timestamp: serverTimestamp()
      };
      try {
        const db = getFirestore();
        const postsCollection = collection(db, 'posts');
        await addDoc(postsCollection, post);
        this.numberOfPosts++;
        this.resetFields();
        this.closeModal();
        this.$emit('create');
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>

<style scoped>
.modal-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background-color: white;
  width: 60%;
  height: 58%;
  padding: 20px;
  border-radius: 10px;
  border: 8px solid #ADBC9F;
}

.modal-content {
  position: relative;
}

.modal-header {
  display: flex;
  justify-content: flex-end;
}

.create-header {
  color: #34503b;
  font-family: 'Nunito Sans', sans-serif;
  font-size: x-large;
  font-weight: bold;
  text-align: center;
  margin-bottom: 3%;
  align-self: flex-end;
}

.close {
  cursor: pointer;
  color: #34503b;
  font-family: 'Nunito Sans', sans-serif;
  font-size: medium;
  font-weight: bold;
  align-self: flex-end;
}

.input-container {
  margin-bottom: 15px;
}

.input-container input[type="text"],
.input-container textarea {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 2px solid #ADBC9F;
  font-family: 'Nunito Sans', sans-serif;
  font-size: medium;
}

.tag {
  display: inline-block;
  margin-right: 10px;
  margin-bottom: 10px;
  background-color: #ccc;
  padding: 5px 10px;
  border-radius: 20px;
  cursor: pointer;
}

.tag-section {
  display: flex;
  align-items: center;
}

.tag-header {
  margin-right: 10px;
  font-family: 'Nunito Sans', sans-serif;
  font-size: medium;
  font-weight: bold;
}

.tag-container {
  align-self: flex-end;
}

.tag.active {
  background-color: #4CAF50;
  color: white;
}

.tag.active.Help {
  background-color: #ff4f4f;
}

.tag.active.Tips {
  background-color: #f957fc;
}

.tag.active.Rant {
  background-color: #ffa229;
}

.tag.active.Happy {
  background-color: #4CAF50;
}

.tag.active.Sad {
  background-color: #FFC0CB;
}

.tag.active.Neutral {
  background-color: #4682B4;
}

.tag.disabled {
  background-color: #dddddd;
  color: #aaa;
  cursor: not-allowed;
}

.tag.disabled:hover {
  background-color: #ccc;
}

#body {
  height:20vh;
}

.rounded-input {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  box-sizing: border-box;
  font-family: 'Nunito Sans', sans-serif;
  font-size: medium;
}

.button-div {
  display: grid;
}

.create-button {
  background-color: #436850;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 5px;
  justify-self: flex-end;
  font-family: 'Nunito Sans', sans-serif;
  font-size: medium;
}

.create-button:hover {
  background-color: #34503b;
}

.error-msg {
  color: red;
  justify-self: center;
}
</style>
