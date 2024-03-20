<template>
  <div>
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
</template>

<script>
import { getFirestore, collection, query, where, getDocs, addDoc, serverTimestamp } from 'https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js';

export default {
  data() {
    return {
      post: {},
      comments: [],
      newComment: ''
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