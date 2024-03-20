<template>
  <h1>Forum</h1>
  <i class="fa-thin fa-caret-down"></i>
  <div class="forum-container">
    <div class="forum-left">
      <div class="create-post">
        <button @click="openModal">Create Post</button>
      </div>

      <div class="search-container">
        <input type="text" v-model="searchQuery" placeholder="Search by title...">
      </div>
    </div>

    <div class="post-display">
      <PostDisplay :posts="displayedPosts" />
      <div class="pagination-buttons">
        <button @click="previousPage" :disabled="currentPage === 1">Previous</button>
        <button @click="nextPage" :disabled="currentPage * pageSize >= totalPosts">Next</button>
      </div>
    </div>

    <PostModal ref="postModal" :fetchPosts="fetchPosts" />
  </div>
</template>

<script>
import PostModal from '../components/PostModal.vue';
import PostDisplay from '../components/PostDisplay.vue';
import { getFirestore, collection, query, orderBy, limit, onSnapshot } from 'https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js';

export default {
  components: {
    PostModal,
    PostDisplay
  },

  data() {
    return {
      posts: [],
      searchQuery: '',
      currentPage: 1,
      pageSize: 3,
      totalPosts: 0
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
    },
    displayedPosts() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.filteredPosts.slice(start, end);
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
          const postData = doc.data();
          this.posts.push(postData);
        });
        this.totalPosts = this.posts.length;
      });
    },
    openModal() {
      this.$refs.postModal.openModal();
    },
    nextPage() {
      this.currentPage++;
    },
    previousPage() {
      this.currentPage--;
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

.pagination-buttons {
  margin-top: 20px;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
