<template>
  <router-link :to="`/database/${post.id}`">
    <div>
      <h3 class="post-name">{{ post.name }}</h3>
      <p class="post-details">
        <span>{{ post.uploadDate }}</span>
        <span>{{ post.author }}</span>
        <span>{{ post.annotator }}</span>
        <span>{{ post.description }}</span>
      </p>
    </div>
  </router-link>
</template>

<script setup>
// use props to receive post data
const props = defineProps({
  post: Object
});
</script>

<style scoped>
.post-name {
  color: rgb(28, 125, 238);
  font-weight: bold;
}
.post-details span {
  display: block;
  margin: 5px 0;
}

router-link {
  text-decoration: none;
  color: inherit;
}

router-link:hover {
  /* 悬停样式 */
  background-color: rgba(0,0,0,0.1);
}

</style>