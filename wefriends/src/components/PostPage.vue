<template>
  <div class="post-container">
    <Navbar id="navbar" />
    <div class="post-content">
      <TopBar :pageName="pageName" id="topbar" />
      <div class="content-wrapper">
        <button class="return-button" @click="navigate('/forum')">Return</button>
        <div class="main-post">
          <h1 class="post-title">{{ post.title }}</h1>
          <p class="post-body">{{ post.body }}</p>
          <p class="post-details">
            <span style="font-size: 1.1em; color:black;">Posted by </span>
            <router-link :to="'/profile/' + post.username" style="font-size: 1.1em; color:#436850; font-weight:bold">
              {{ post.username }}
            </router-link> <br>
            {{ post.formattedTimestamp }}
          </p>
        </div>
        <div class="comment-container" :style="{ maxHeight: commentContainerMaxHeight + 'px' }">
          <div v-for="comment in comments" :key="comment.id" class="comment">
            <router-link :to="'/profile/' + comment.username">
              <img :src="comment.profilePic" alt="profile-picture" class="profile-picture-preview">
            </router-link>
            <div class="comment-content">
              <router-link :to="'/profile/' + comment.username">
                <p style="color: #436850;"><b>{{ comment.username }}</b></p>
              </router-link>
              <p>{{ comment.content }}</p>
            </div>
            <p class="comment-details">{{ comment.formattedTimestamp }}</p>
          </div>
        </div>
        <div class="vote-container">
          <div class="vote">
            <button @click="toggleUpvote" :class="{ active: upvoted }" class="upvote-btn">↑</button>
            <span class="score">{{ calculateScore }}</span>
            <button @click="toggleDownvote" :class="{ active: downvoted }" class="downvote-btn">↓</button>
          </div>
        </div>
        <div class="comment-form">
          <textarea v-model="newComment" placeholder="Add a comment"></textarea>
          <button @click="submitComment">Send</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getFirestore, collection, query, where, getDocs, addDoc, serverTimestamp, doc, updateDoc, increment, getDoc, setDoc, deleteDoc } from 'https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.0.2/firebase-auth.js';
import { getStorage, ref, getDownloadURL } from 'https://www.gstatic.com/firebasejs/9.0.2/firebase-storage.js';
import Navbar from '@/components/Navbar.vue';
import TopBar from '@/components/TopBar.vue';
import { useRouter } from 'vue-router';
import firebaseApp from "../firebase.js";

const storage = getStorage(firebaseApp);

export default {
  components: {
    Navbar,
    TopBar,
  },
  setup() {
    const router = useRouter();
    return { router };
  },
  data() {
    return {
      id: '',
      post: {},
      comments: [],
      newComment: '',
      pageName: 'Post ' + this.$route.params.postId,
      commentContainerMaxHeight: 0,
      upvotes: 0,
      downvotes: 0,
      upvoted: false,
      downvoted: false,
      profilePic: null,
      profilePicPromises: [],
    };
  },
  mounted() {
    this.adjustCommentContainerHeight();
    window.addEventListener('resize', this.adjustCommentContainerHeight);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.adjustCommentContainerHeight);
  },
  async created() {
    try {
      const db = getFirestore();
      const postId = this.$route.params.postId;

      const postQuery = query(collection(db, 'posts'), where('id', '==', postId));
      const postSnapshot = await getDocs(postQuery);

      if (!postSnapshot.empty) {
        postSnapshot.forEach((doc) => {
          this.id = doc.id;
          this.upvotes = doc.data().upvotes;
          this.downvotes = doc.data().downvotes;
          this.post = {
            ...doc.data(),
            formattedTimestamp: this.calculateTimeDifference(doc.data().timestamp.toMillis())
          };
        });
      } else {
        console.log('No such document!');
        this.$router.push('/NotFound')
      }

      this.loadComments();

    } catch (error) {
      console.error('Error getting document:', error);
    }
  },
  methods: {
    navigate(path) {
      this.$router.push(path);
    },
    calculateTimeDifference(timestampMillis) {
      const currentTime = new Date().getTime();
      const timeDifference = currentTime - timestampMillis;

      if (timeDifference < 0) {
      return "just now";
    }

      const seconds = Math.floor(timeDifference / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);

      if (days > 0) {
        return `${days} day${days > 1 ? 's' : ''} ago`;
      } else if (hours > 0) {
        return `${hours} hour${hours > 1 ? 's' : ''} ago`;
      } else if (minutes > 0) {
        return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
      } else {
        return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
      }
    },
    adjustCommentContainerHeight() {
      const mainPostHeight = document.querySelector('.main-post').offsetHeight;
      const commentFormHeight = document.querySelector('.comment-form').offsetHeight;
      const windowHeight = window.innerHeight;

      const commentContainerHeight = windowHeight - mainPostHeight - commentFormHeight - 200;
      this.commentContainerMaxHeight = Math.max(commentContainerHeight, 0);
    },
    async submitComment() {
      if (this.newComment.trim() === '') return;

      const currentUser = getAuth().currentUser;
      
      try {
        const db = getFirestore();
        const postId = this.$route.params.postId;
        await addDoc(collection(db, 'comments'), {
          postId: postId,
          content: this.newComment.trim(),
          userId: currentUser.uid,
          username: currentUser.displayName,
          timestamp: serverTimestamp()
        });
        this.newComment = '';
        this.loadComments();
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

        const profilePicPromises = commentsSnapshot.docs
          .filter(doc => doc.data().postId === postId)
          .map(async doc => {
            const data = doc.data();
            const storageRef = ref(storage, `ProfilePictures/${data.userId}`);
            const profilePic = await getDownloadURL(storageRef);
            console.log(profilePic)
            const timestamp = data.timestamp.toDate();
            const formattedTimestamp = this.calculateTimeDifference(timestamp);;
            return { ...data, profilePic, formattedTimestamp };
          });

        const commentsWithProfilePics = await Promise.all(profilePicPromises);

        this.comments = commentsWithProfilePics.map(comment => ({
          ...comment,
        })).sort((a, b) => b.timestamp - a.timestamp);

      } catch (error) {
        console.error('Error loading comments:', error);
      }
    },

    async checkUserVote() {
      const currentUser = getAuth().currentUser;
      if (currentUser) {
        const db = getFirestore();
        const postId = this.id;
        const userId = currentUser.uid;

        const userActionRef = doc(db, 'user_actions', `${postId}_${userId}`);
        const userActionDoc = await getDoc(userActionRef);
        return userActionDoc.exists() ? userActionDoc.data().voted : null;
      }
      return null;
    },

    async toggleUpvote() {
      const currentUser = getAuth().currentUser;
      if (currentUser) {
        const db = getFirestore();
        const postId = this.id;
        const userId = currentUser.uid;

        const userVote = await this.checkUserVote();
        if (!userVote) {
          const userActionRef = doc(db, 'user_actions', `${postId}_${userId}`);
          await setDoc(userActionRef, { postId, userId, voted: 'upvote' });

          // Update the upvotes in the post document
          const postRef = doc(db, 'posts', postId);
          updateDoc(postRef, { upvotes: increment(1) });

          // Update local state
          this.upvotes++;
          this.upvoted = true;
        } else if (userVote === 'upvote') {
          // User already upvoted, remove the upvote
          const userActionRef = doc(db, 'user_actions', `${postId}_${userId}`);
          await deleteDoc(userActionRef);

          // Update the upvotes in the post document
          const postRef = doc(db, 'posts', postId);
          updateDoc(postRef, { upvotes: increment(-1) });

          // Update local state
          this.upvotes--;
          this.upvoted = false;
        } else if (userVote === 'downvote') {
          // User downvoted before, change to upvote
          const userActionRef = doc(db, 'user_actions', `${postId}_${userId}`);
          await updateDoc(userActionRef, { voted: 'upvote' });

          // Update the upvotes and downvotes in the post document
          const postRef = doc(db, 'posts', postId);
          updateDoc(postRef, {
            upvotes: increment(1),
            downvotes: increment(-1)
          });

          // Update local state
          this.upvotes++;
          this.downvotes--;
          this.upvoted = true;
          this.downvoted = false;
        }
      }
    },

    async toggleDownvote() {
      const currentUser = getAuth().currentUser;
      if (currentUser) {
        const db = getFirestore();
        const postId = this.id;
        const userId = currentUser.uid;

        const userVote = await this.checkUserVote();
        if (!userVote) {
          const userActionRef = doc(db, 'user_actions', `${postId}_${userId}`);
          await setDoc(userActionRef, { postId, userId, voted: 'downvote' });

          // Update the downvotes in the post document
          const postRef = doc(db, 'posts', postId);
          updateDoc(postRef, { downvotes: increment(1) });

          // Update local state
          this.downvotes++;
          this.downvoted = true;
        } else if (userVote === 'downvote') {
          // User already downvoted, remove the downvote
          const userActionRef = doc(db, 'user_actions', `${postId}_${userId}`);
          await deleteDoc(userActionRef);

          // Update the downvotes in the post document
          const postRef = doc(db, 'posts', postId);
          updateDoc(postRef, { downvotes: increment(-1) });

          // Update local state
          this.downvotes--;
          this.downvoted = false;
        } else if (userVote === 'upvote') {
          // User upvoted before, change to downvote
          const userActionRef = doc(db, 'user_actions', `${postId}_${userId}`);
          await updateDoc(userActionRef, { voted: 'downvote' });

          // Update the upvotes and downvotes in the post document
          const postRef = doc(db, 'posts', postId);
          updateDoc(postRef, {
            upvotes: increment(-1),
            downvotes: increment(1)
          });

          // Update local state
          this.upvotes--;
          this.downvotes++;
          this.upvoted = false;
          this.downvoted = true;
        }
      }
    },
  },

  computed: {
    calculateScore() {
      return this.upvotes - this.downvotes;
    }
  }
};
</script>

<style scoped>
.post-container {
  display: flex;
  justify-content: space-around;
  height: 100vh;
  overflow-x: hidden;
}

.post-container::-webkit-scrollbar {
  display: none;
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

.return-button {
  position: absolute;
  left: 21.3%;
  background-color: #436850;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-family: 'Nunito Sans', sans-serif;
  font-size: medium;
}

.return-button:hover {
  background-color: #34503b;
}

.main-post {
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
  width:80%;
  align-self: flex;
  margin-left:12.2%;
  border-radius: 20px;
  position: relative;
}

.post-title {
  font-weight: bold;
  font-size: 1.2em;
  margin-bottom: 5px;
  margin-left: 20px;
  color: #436850;
}

.post-body {
  line-height: 1.5;
  padding-left: 20px;
  padding-right: 20px;
}

.post-details {
  line-height: 1.5;
  padding-left: 20px;
  padding-right: 20px;
  color: #777777;
  position: absolute;
  top: 15%;
  right: 20px;
  font-size: 0.9em;
  text-align: right;
}

.comment-container {
  overflow-y: auto;
  width: 70%;
  margin-left: 310px;
  padding-right: 20px;
}

.comment {
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  padding: 20px;
  margin-bottom: 10px;
  border-radius: 20px;
  display: flex;
  align-items: flex-start;
}

.profile-picture-preview {
  width: 50px;
  height: auto;
  border-radius: 50%;
  margin-right: 20px;
}

.comment-content {
  flex: 1;
  margin-right: 20px;
}

.comment-details {
  margin-left: auto;
  margin-right: 5px;
  margin-top: 5px;
  font-size: 0.9em;
  color: #666;
  text-align: right;
}

.comment-form {
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  padding: 20px;
  margin-left:12.2%;
  margin-bottom: 20px;
  width:60%;
  display: flex;
  position: fixed;
  bottom: 0;
  border-radius: 20px;
}

textarea {
  width: calc(100% - 80px);
  height: 50px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  box-sizing: border-box;
  margin-right: 20px;
  font-family: 'Nunito Sans', sans-serif;
  font-size: medium;
}

.button-wrapper {
  display: flex;
  align-items: center;
}

button {
  background-color: #436850;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-family: 'Nunito Sans', sans-serif;
  font-size: medium;
}

button:hover {
  background-color: #34503b;
}
.comment-container::-webkit-scrollbar {
  width: 7px;
}

.comment-container::-webkit-scrollbar-track {
  background-color: transparent;
}

.comment-container::-webkit-scrollbar-thumb {
  background-color: #fbfada;
  border-radius: 5px;
}

.comment-container::-webkit-scrollbar-thumb:hover {
  background-color: #555;
}

.vote-container {
  position: fixed;
  bottom: 2%;
  left: 21%;
  margin-left: 20px;
  margin-bottom: 20px;
}

.upvote-btn, .downvote-btn {
  font-size: x-large;
  font-weight: bold;
}

.score {
  margin-left:30px;
  margin-right:30px;
  font-family: 'Nunito Sans', sans-serif;
  font-size: larger;
  font-weight: bolder;
}

.post-details a:hover,
.comment-content a:hover {
  text-decoration: underline;
}

.post-details a,
.comment-content a {
  color: inherit;
  cursor: pointer;
}
</style>
