<template>
  <div class="post-container">
    <Navbar id="navbar" />

    <div class="post-content">
      <TopBar :pageName="pageName" id="topbar" />
      
      <div class="content-wrapper">
        <div class="main-post">
          <h1 class="post-title">{{ post.title }}</h1>
          <p class="post-body">{{ post.body }}</p>
        </div>

        <div v-for="comment in comments" :key="comment.id" class="comment">
          <p>{{ comment.content }}</p>
          <p>Posted at: {{ comment.formattedTimestamp }}</p>
        </div>

        <div class="comment-form">
          <textarea v-model="newComment" placeholder="Add a comment"></textarea>
          <button @click="submitComment">Submit</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getFirestore, collection, query, where, getDocs, addDoc, serverTimestamp } from 'https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js';
import Navbar from '@/components/Navbar.vue'
import TopBar from '@/components/TopBar.vue'

export default {
  components: {
    Navbar,
    TopBar
  },
  data() {
    return {
      post: {},
      comments: [],
      newComment: '',
      pageName: 'Post ' + this.$route.params.postId
    };
  },
  async created() {
    try {
      const db = getFirestore();
      const postId = this.$route.params.postId;

      // Load Post
      const postQuery = query(collection(db, 'posts'), where('id', '==', postId));
      const postSnapshot = await getDocs(postQuery);

      if (!postSnapshot.empty) {
        postSnapshot.forEach((doc) => {
          this.post = doc.data();
        });
      } else {
        console.log('No such document!');
      }

      // Load Respective Comments
      this.loadComments(); // Load comments initially

    } catch (error) {
      console.error('Error getting document:', error);
    }
  },
  methods: {
    async submitComment() {
      if (this.newComment.trim() === '') return;
      
      try {
        const db = getFirestore();
        const postId = this.$route.params.postId;
        await addDoc(collection(db, 'comments'), {
          postId: postId,
          content: this.newComment.trim(),
          timestamp: serverTimestamp()
        });
        this.newComment = ''; // Clear input after submission
        this.loadComments(); // Reload comments after submission
      } catch (error) {
        console.error('Error adding comment:', error);
      }
    },
    async loadComments() {
      try {
        const db = getFirestore();
        const postId = this.$route.params.postId;
        const commentsQuery = query(collection(db, 'comments'), where('postId', '==', postId));
        const commentsSnapshot = await getDocs(commentsQuery);

        this.comments = commentsSnapshot.docs.map(doc => {
          const data = doc.data();
          const timestamp = data.timestamp.toDate();
          const formattedTimestamp = timestamp.toLocaleString();
          return { ...data, formattedTimestamp };
        });
      } catch (error) {
        console.error('Error loading comments:', error);
      }
    }
  }
};
</script>

<style scoped>
.post-container {
  display: flex;
  justify-content: space-around;
  height: 100vh;
}

#navbar {
  width: 20%;
}

#topbar {
  height: 5%;
}

.post-content {
  width: 80%;
  display: flex;
  flex-direction: column;
  background-color: #ADBC9F;
}

.content-wrapper {
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}

.main-post {
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
  width: 80%;
}

.post-title {
  font-weight: bold;
  font-size: 1.2em;
  margin-bottom: 5px;
  padding: 20px;
}

.post-body {
  line-height: 1.5;
}

.comment {
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  padding: 20px;
  margin-bottom: 5px;
  width:60%
}

.comment-form {
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  padding: 20px;
  margin-top: 20px;
  width:70%;
}

textarea {
  width: calc(100% - 20px);
  height: 100px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  box-sizing: border-box;
  margin-bottom: 10px;
}

button {
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}
</style>
