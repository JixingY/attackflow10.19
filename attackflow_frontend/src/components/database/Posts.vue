<template>
  <router-link :to="`/database/${post.id}`">
    <div>
      <h3 class="post-name">{{ post.document_name }}</h3>
      <p class="post-details">
        <span>{{ post.updatedAt }}</span>
        <span>{{ post.account }}</span>
        <span>{{ post.referenced_text }}</span>
        <span>{{ post.tags }}</span>
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