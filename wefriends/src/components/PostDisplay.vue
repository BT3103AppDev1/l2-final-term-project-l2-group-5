<template>
  <div>
    <a v-for="post in filteredPosts" :key="post.id" :href="'/post/' + post.id" class="post-link">
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
  props: ['posts', 'searchQuery'],
  computed: {
    filteredPosts() {
      if (!this.searchQuery) {
        return this.posts;
      } else {
        return this.posts.filter(post => {
          return post.title.toLowerCase().includes(this.searchQuery.toLowerCase());
        });
      }
    }
  },
  methods: {
    truncateText(text) {
      if (text.length > 200) {
        return text.substring(0, 200) + '...';
      } else {
        return text;
      }
    }
  }
};
</script>

<style scoped>
.post {
  border: 1px solid #ccc;
  border-radius: 10px;
  margin-bottom: 20px;
  padding: 20px;
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
  background-color: #4CAF50; /* Green */
}

.Sad {
  background-color: #FFC0CB; /* Pink */
}

.Neutral {
  background-color: #4682B4; /* Blue */
}
</style>
