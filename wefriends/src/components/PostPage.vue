<template>
  <div class="post-container">
    <Navbar id="navbar" />

    <div class="post-content">
      <TopBar :pageName="pageName" id="topbar" />
      <h1>{{ post.title }}</h1>
      <p>{{ post.body }}</p>

      <div v-for="comment in comments" :key="comment.id">
        <p>{{ comment.content }}</p>
        <p>Posted at: {{ comment.timestamp }}</p>
      </div>

      <div>
        <textarea v-model="newComment" placeholder="Add a comment"></textarea>
        <button @click="submitComment">Submit</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.post-container {
  display: flex;
  justify-content: space-around;
  height:100vh;
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
  display: flex;
}

</style>

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

      //Load Post
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
      const commentsQuery = query(collection(db, 'comments'), where('postId', '==', postId));
      const commentsSnapshot = await getDocs(commentsQuery);
      this.comments = commentsSnapshot.docs.map(doc => doc.data());

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
        this.comments = commentsSnapshot.docs.map(doc => doc.data());
      } catch (error) {
        console.error('Error loading comments:', error);
      }
    }
  }
};
</script>