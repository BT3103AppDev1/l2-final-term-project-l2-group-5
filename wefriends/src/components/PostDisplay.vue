<template>
  <div>
    <div v-for="post in posts":key="post.id" class="post">
      <div class="post-content">
        <h3>{{ post.title }}</h3>
        <p>{{ post.body }}</p>
        <span>{{ post.tag }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { getFirestore, collection, query, orderBy, onSnapshot } from 'https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js';

export default {
  data() {
    return {
      posts: []
    };
  },
  created() {
    this.fetchPosts();
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
    }
  }
};
</script>

<style scoped>
.post {
  border: 1px solid #ccc;
  border-radius: 10px;
  margin-bottom: 10px;
  padding: 10px;
}
</style>
