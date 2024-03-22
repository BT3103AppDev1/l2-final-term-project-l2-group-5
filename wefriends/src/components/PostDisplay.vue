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
