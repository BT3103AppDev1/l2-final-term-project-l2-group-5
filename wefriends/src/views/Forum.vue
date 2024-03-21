<template>
  <div class="forum-container">
    <Navbar id="navbar" />

    <div class="forum-content">
      <TopBar :pageName="pageName" id="topbar" />
      <div class="content-wrapper">
        <div class="forum-mid">
          <div class="search-container">
            <input type="text" v-model="searchQuery" placeholder="Search by title...">
          </div>

          <div class="sort-container">
            <select v-model="sortOrder" class="sort-dropdown">
              <option value="desc">Latest to Oldest</option>
              <option value="asc">Oldest to Latest</option>
            </select>
          </div>

          <div class="create-post">
            <button @click="openModal" class="post-button">Create Post</button>
          </div>
        </div>

        <div class="forum-right">
          <PostDisplay :displayedPosts="displayedPosts" />
          <div class="pagination-buttons">
            <button @click="previousPage" :disabled="currentPage === 1">Previous</button>
            <button @click="nextPage" :disabled="currentPage * pageSize >= totalPosts">Next</button>
          </div>
        </div>
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
import { getFirestore, collection, query, orderBy, onSnapshot } from 'https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js';

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
      sortOrder: 'desc',
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
    sortedPosts() {
      if (this.sortOrder === 'desc') {
        return this.filteredPosts.slice().sort((a, b) => b.timestamp - a.timestamp);
      } else {
        return this.filteredPosts.slice().sort((a, b) => a.timestamp - b.timestamp);
      }
    },
    displayedPosts() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.sortedPosts.slice(start, end);
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
  display: flex;
  justify-content: space-around;
  height:100vh;
}

#navbar {
  width: 20%;
}

.forum-content {
  width: 80%;
  display: flex;
  flex-direction: column;
  background-color: #ADBC9F;
}

.content-wrapper {
  display: flex;
}

.forum-mid {
  width: 30%;
  padding: 20px;
  background-color: #ADBC9F;
}

.search-container {
  padding: 20px;
  width: 79%;
}

.sort-container {
  padding: 20px;
  width: 100%;
}

.sort-dropdown {
  width: 85%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.create-post {
  padding: 20px;
}

.post-button {
  background-color: #436850;
  border: none;
  border-radius: 10px;
  width: 96%;
  height: 40px;
  color: white;
  text-align: center;
  cursor: pointer;
}

.post-button:hover {
  background-color: #34503b;
}

.forum-right {
  width: 70%;
  padding: 20px;
  padding-top:40px;
  background-color: #ADBC9F;
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

#topbar {
  height: 5%;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

</style>