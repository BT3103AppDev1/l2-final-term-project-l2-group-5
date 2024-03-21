<template>
  <div class="modal-wrapper" v-show="showModal">
    <div class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <div class="input-container">
          <input type="text" v-model="title" placeholder="Title" class="rounded-input">
        </div>
        <div class="input-container">
          <textarea v-model="body" placeholder="Body Text" class="rounded-input" id="body"></textarea>
        </div>
        <div class="input-container">
          <select v-model="selectedTag" class="rounded-input">
            <option value="Happy">Happy</option>
            <option value="Sad">Sad</option>
            <option value="Neutral">Neutral</option>
          </select>
        </div>
        <button @click="createPost" class="create-button">Create Post</button>
      </div>
    </div>
  </div>
</template>

<script>
import { getFirestore, collection, addDoc, serverTimestamp, getDocs } from 'https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js';

export default {
  data() {
    return {
      showModal: false,
      title: '',
      body: '',
      selectedTag: 'Happy',
      numberOfPosts: 0
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
      this.showModal = false;
    },
    async createPost() {
      const post = {
        id: (this.numberOfPosts + 1).toString(),
        title: this.title,
        body: this.body,
        tag: this.selectedTag,
        timestamp: serverTimestamp()
      };
      try {
        const db = getFirestore();
        const postsCollection = collection(db, 'posts');
        await addDoc(postsCollection, post);
        this.numberOfPosts++;
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
  height: 300px;
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
}

.create-button {
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.create-button:hover {
  background-color: #45a049;
}
</style>
