<template>
  <div class="forum-container">
    <Navbar id="navbar" />

    <div class="forum-content">
      <TopBar :pageName="pageName" id="topbar" />
      <div class="content-wrapper">
        <div class="forum-mid">
          <div class="search-container">
            <input id="search-text" type="text" v-model="searchQuery" placeholder="Search by title...">
          </div>

          <div class="sort-container">
            <select v-model="sortOrder" class="sort-dropdown">
              <option value="desc" class="sort-options">Sort: Latest to Oldest</option>
              <option value="asc" class="sort-options">Sort: Oldest to Latest</option>
            </select>
            
            <div class="tag-filter-container">
              <h3 id="filter-header">Filter by Tag:</h3>
              <div class="tag-filter">
                <span v-for="tag in tags" :key="tag" :class="[tag, 'tag-toggle', { active: tagFilters.includes(tag) }]" @click="toggleTagFilter(tag)">{{ tag }}</span>
              </div>
            </div>
          </div>

          <div class="create-post">
            <button @click="openModal" class="post-button">Create Discussion</button>
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
      totalPosts: 0,
      tags: ['Happy', 'Sad', 'Neutral'],
      tagFilters: []
    };
  },

  computed: {
    filteredPosts() {
      let filtered = this.posts;
      if (this.searchQuery) {
        filtered = filtered.filter(post => {
          return post.title.toLowerCase().includes(this.searchQuery.toLowerCase());
        });
      }
      if (this.tagFilters.length > 0) {
        filtered = filtered.filter(post => this.tagFilters.includes(post.tag));
      }
      return filtered;
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
      this.totalPosts = this.sortedPosts.length;
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
    },
    toggleTagFilter(tag) {
      if (this.tagFilters.includes(tag)) {
        this.tagFilters = this.tagFilters.filter(filterTag => filterTag !== tag);
      } else {
        this.tagFilters.push(tag);
      }
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

#search-text {
  font-family: 'Nunito Sans', sans-serif;
  font-size: medium;
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
  font-family: 'Nunito Sans', sans-serif;
  font-size: medium;
}

.sort-options {
  font-family: 'Nunito Sans', sans-serif;
  font-size: medium;
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
  font-family: 'Nunito Sans', sans-serif;
  font-size:medium;
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
  position: absolute;
  bottom: -15px;
  left: 72%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
}

.pagination-buttons button {
  background-color: #436850;
  border: none;
  border-radius: 10px;
  height: 40px;
  color: white;
  cursor: pointer;
  font-family: 'Nunito Sans', sans-serif;
  font-size: medium;
  margin: 0 15px;
  width: 120px;
}

.pagination-buttons button:hover {
  background-color: #34503b;
}

#topbar {
  height: 5%;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

#filter-header {
  margin-top: 0px;
}

.tag-filter-container {
  background-color: #f5f5f5;
  border-radius: 10px;
  padding: 20px;
  width:75%;
  margin-top: 40px;
}

.tag-filter {
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
  margin-bottom: 5px;
}

.tag-toggle {
  background-color: #ccc;
  border-radius: 20px;
  padding: 5px 10px;
  margin-right: 10px;
  cursor: pointer;
}

.tag-toggle.active {
  color: white;
}

.tag-toggle.active.Happy {
  background-color: #4CAF50;
}

.tag-toggle.active.Sad {
  background-color: #FFC0CB;
}

.tag-toggle.active.Neutral {
  background-color: #4682B4;
}

</style>