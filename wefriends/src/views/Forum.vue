<template>
  <div class="forum-container">
    <div class="forum-left">
      <Navbar id="navbar" />
    </div>


      <div class="forum-mid">
        <div class="create-post">
          <button @click="openModal">Create Post</button>
        </div>

        <div class="search-container">
          <input type="text" v-model="searchQuery" placeholder="Search by title...">
        </div>
      </div>

      <div class="forum-right">
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
import PostModal from '@/components/PostModal.vue';
import PostDisplay from '@/components/PostDisplay.vue';
import Navbar from '@/components/Navbar.vue'
import TopBar from '@/components/TopBar.vue'
import { getFirestore, collection, query, orderBy, limit, onSnapshot } from 'https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js';

export default {
  components: {
    PostModal,
    PostDisplay,
    Navbar,
    TopBar
  },

  data() {
    return {
      pageName: "Forum",
      posts: [],
      searchQuery: '',
      currentPage: 1,
      pageSize: 4,
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
  background-color: #ADBC9F;
}

.create-post {
  position: relative;
  top: 50%;
  left: 0;
  padding: 20px;
}

.search-container {
  position: relative;
  width: 15%;
  left:20%;
  padding: 20px;
}

.forum-left{
  width:20%;
  background-color: white;
}

.forum-mid {
  position: absolute;
  top: 0;
  left: 25%;
  width: 50%;
  padding: 20px;
  height: 100vh;
}

.forum-right {
  position: absolute;
  top: 0;
  right: 0;
  width: 50%;
  padding: 20px;
  background-color: #ADBC9F;
  height: 91vh;
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
