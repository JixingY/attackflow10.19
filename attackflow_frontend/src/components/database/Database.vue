<template>
  <div>
    <el-header>
      <Header/>
    </el-header>

    <div class="search-container">
      <input type="text" class="search-input" placeholder="Search…">
      <img src="@/assets/images/magnifying-glass.png" alt="Search" class="search-icon">
    </div>

    <div class="sort-container">
      <span>Sort By:</span>
      <img src="@/assets/images/sort-icon.png" alt="Sort" class="sort-icon">
    </div>

    <ul class="posts-list">
      <li v-for="post in posts" :key="post.id">
        <Post :post="post" />
      </li>
    </ul>

    <div class="pagination">
      <button v-for="page in totalPages" :key="page" @click="currentPage = page">{{ page }}</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Header from "@/components/home/Header.vue";
import Post from './Posts.vue';


const posts = [
  // 示例数据
  {
    id: 1,
    name: "Attack 1",
    uploadDate: "2023-09-01",
    author: "Author A",
    annotator: "Annotator X",
    description: "Description for Attack 1"
  },
  {
    id: 2,
    name: "Attack 2",
    uploadDate: "2023-09-02",
    author: "Author B",
    annotator: "Annotator X",
    description: "Description for Attack 2"
  },
  {
    id: 3,
    name: "Attack 3",
    uploadDate: "2023-09-02",
    author: "Author B",
    annotator: "Annotator X",
    description: "Description for Attack 2"
  },
  {
    id: 4,
    name: "Attack 4",
    uploadDate: "2023-09-02",
    author: "Author B",
    annotator: "Annotator X",
    description: "Description for Attack 2"
  },
  {
    id: 5,
    name: "Attack 5",
    uploadDate: "2023-09-02",
    author: "Author B",
    annotator: "Annotator X",
    description: "Description for Attack 2"
  },
  {
    id: 6,
    name: "Attack 6",
    uploadDate: "2023-09-02",
    author: "Author B",
    annotator: "Annotator X",
    description: "Description for Attack 2"
  },
];

const totalPages = Math.ceil(posts.length / 5);
const currentPage = ref(1);
</script>

<style scoped>
el-header {
  background: linear-gradient(180deg, rgb(84, 95, 113), transparent);
}

.search-container {
  position: relative;
  width: 100%;
  max-width: 500px;
  margin: 50px auto;
}

.search-input {
  width: 100%;
  padding: 10px 30px;
  border-radius: 20px;
  border: 1px solid #ccc;
}

.search-icon {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
}

.sort-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
}

.sort-icon {
  margin-left: 10px;
  width: 20px;
}

.posts-list {
  list-style: none;
  padding: 0;
  margin: 20px 0;
}

.posts-list li {
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 20px;
}

.post-name {
  color: rgb(28, 125, 238);
  font-weight: bold;
}

.post-details span {
  display: block;
  margin: 5px 0;
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>
