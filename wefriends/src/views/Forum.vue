<template>
    <h1>Forum</h1>
    <i class="fa-thin fa-caret-down"></i>
    <div class="forum-container">
      <div>
        <div class="create-post">
          <button @click="openModal">Create Post</button>
        </div>
  
        <div class="search-container">
          <input type="text" v-model="searchQuery" placeholder="Search by title...">
        </div>
      </div>
  
      <div class="post-display">
        <PostDisplay :posts="filteredPosts" />
      </div>
  
      <PostModal ref="postModal" :fetchPosts="fetchPosts" />
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
        posts: [],
        searchQuery: ''
      };
    },
  
    computed: {
      filteredPosts() {
        if (!this.searchQuery) {
          return this.posts;
        } else {
          return this.posts.filter(post => {
            return post.title.toLowerCase().includes(this.searchQuery.toLowerCase());
          });
        }
      }
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
  
  
  <style scoped>
  .forum-container {
    position: relative;
  }
  
  .create-post {
    position: absolute;
    top: 60px;
    left: 0;
    padding: 20px;
  }
  
  .search-container {
    position: absolute;
    width: 15%;
    padding: 20px;
  }
  
  .post-display {
    position: absolute;
    top: 0;
    right: 0;
    width: 70%;
    padding: 20px;
  }
  
  .input-container {
    margin-bottom: 10px;
  }
  
  input[type="text"] {
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
  }
  </style>
  