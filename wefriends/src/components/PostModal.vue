<template>
  <div class="modal-wrapper" v-show="showModal">
    <div class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModal">X</span>
        <div class="input-container">
          <input type="text" v-model="title" placeholder="Title (Required)" class="rounded-input">
        </div>
        <div class="input-container">
          <textarea v-model="body" placeholder="Content (Required)" class="rounded-input" id="body"></textarea>
        </div>
        <div class="input-container">
          <select v-model="selectedTag" class="rounded-input">
            <option value="Happy">Happy</option>
            <option value="Sad">Sad</option>
            <option value="Neutral">Neutral</option>
          </select>
        </div>
        <button @click="createPost" class="create-button">Create Post</button>
        <span class="error-msg" v-if="showErrorMessage">Title and Content are required fields.</span>
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
      selectedTag: 'Happy',
      numberOfPosts: 0,
      showErrorMessage: false
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
      this.selectedTag = 'Happy';
      this.showErrorMessage = false;
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
        tag: this.selectedTag,
        userId: currentUser.uid,
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
  width: 600px;
  height: 320px;
  padding: 20px;
  border-radius: 10px;
}

.modal-content {
  position: relative;
  padding-top:30px;
}

.close {
  position: absolute;
  top: -5px;
  right: 0px;
  cursor: pointer;
  color: #34503b;
  font-family: 'Nunito Sans', sans-serif;
  font-size: medium;
  font-weight: bold;
}

.input-container {
  margin-bottom: 15px;
}

#body {
  height:100px;
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

.create-button {
  background-color: #436850;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 5px;
}

.create-button:hover {
  background-color: #34503b;
}

.error-msg {
  color: red;
  margin-left: 20px
}
</style>
