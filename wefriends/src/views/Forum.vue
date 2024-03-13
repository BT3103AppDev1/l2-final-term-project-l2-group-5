<template>
    <div class="forum-container">
      <div class="create-post">
        <button @click="openModal">Create Post</button>
      </div>
      <div class="post-display">
        <PostDisplay :posts="posts" />
      </div>
      <PostModal ref="postModal" @create="fetchPosts" />
    </div>
  </template>
  
  <script>
  import PostModal from '../components/PostModal.vue';
  import PostDisplay from '../components/PostDisplay.vue';
  import { getFirestore, collection, query, orderBy, onSnapshot } from 'https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js';
  
  export default {
    components: {
      PostModal,
      PostDisplay
    },
    data() {
      return {
        posts: []
      };
    },
    methods: {
      fetchPosts() {
        const db = getFirestore();
        const postsCollection = collection(db, 'posts');
        const q = query(postsCollection, orderBy('timestamp', 'desc'));
  
        onSnapshot(q, (snapshot) => {
          this.posts = [];
          snapshot.forEach((doc) => {
            this.posts.push(doc.data());
          });
        });
      },
      openModal() {
        this.$refs.postModal.openModal();
      }
    },
    created() {
      this.fetchPosts();
    }
  };
  </script>