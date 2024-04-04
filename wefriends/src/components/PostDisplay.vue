<template>
  <div>
    <a v-for="post in displayedPosts" :key="post.id" :href="'/post/' + post.id" class="post-link">
      <div class="post">
        <div class="post-content">
          <h3>{{ post.title }}</h3>
          <p class="truncated">{{ truncateText(post.body) }}</p>
          <div class="tag-container">
            <span class="tag" :class="post.tag">{{ post.tag }}</span>
          </div>
          <div class="score-container">
            <span class="score">Score: {{ calculateScore(post) }}</span>
          </div>
          <div class="days-ago">{{ calculateDaysAgo(post.timestamp.toMillis()) }}</div>
        </div>
      </div>
    </a>
  </div>
</template>

<script>
export default {
  props: ['displayedPosts'],
  methods: {
    truncateText(text) {
      if (text.length > 90) {
        return text.substring(0, 90) + '...';
      } else {
        return text;
      }
    },
    calculateScore(post) {
      return post.upvotes - post.downvotes;
    },
    calculateDaysAgo(timestamp) {
      const currentTime = new Date().getTime();
      const postTime = new Date(timestamp).getTime();
      const timeDifference = currentTime - postTime;
      
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
    }
  }
};
</script>

<style scoped>
.post {
  border: 1px solid #F5F5F5;
  border-radius: 10px;
  margin-bottom: 20px;
  margin-right: 10px;
  padding: 20px;
  background-color: #F5F5F5;
}

.post-link {
  text-decoration: none;
  color: black;
}

.post-link h3:hover {
  text-decoration: underline;
}

.post-content {
  margin-bottom: 10px;
  position:relative;
}

.days-ago {
  position: absolute;
  bottom: 0;
  right: 0;
  font-size: 0.9em;
  color: #666;
}

.score-container {
  position: absolute;
  top: 0;
  right: 0;
}

.score {
  background-color: #436850;
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
}

.truncated {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

h3 {
  margin: 0;
}

.tag-container {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}

.tag {
  padding: 5px 10px;
  border-radius: 20px;
  margin-right: 10px;
  margin-bottom: 10px;
  font-size: 14px;
  color: white;
}

.Happy {
  background-color: #4CAF50;
}

.Sad {
  background-color: #FFC0CB;
}

.Neutral {
  background-color: #4682B4;
}
</style>
