<template>
  <div class="modal" v-show="showModal">
    <div class="modal-content">
      <span class="close" @click="closeModal">&times;</span>
      <input type="text" v-model="title" placeholder="Title">
      <textarea v-model="body" placeholder="Body Text"></textarea>
      <select v-model="selectedTag">
        <option value="Happy">Happy</option>
        <option value="Sad">Sad</option>
        <option value="Neutral">Neutral</option>
      </select>
      <button @click="createPost">Create Post</button>
    </div>
  </div>
</template>

<script>
// Commenting out user-related stuff until login is fully functional
//import { getAuth, currentUser } from 'https://www.gstatic.com/firebasejs/9.0.2/firebase-auth.js';
import { getFirestore, collection, addDoc, serverTimestamp } from 'https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js';

export default {
  data() {
    return {
      showModal: false,
      title: '',
      body: '',
      selectedTag: 'Happy'
    };
  },
  methods: {
    openModal() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    async createPost() {
      //const user = currentUser(getAuth());
      //const userId = user ? user.uid : null;

      const post = {
        //userId: userId,
        title: this.title,
        body: this.body,
        tag: this.selectedTag,
        timestamp: serverTimestamp()
      };
      try {
        const db = getFirestore();
        const postsCollection = collection(db, 'posts');
        await addDoc(postsCollection, post);
        this.closeModal();
        this.$emit('create');
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>
