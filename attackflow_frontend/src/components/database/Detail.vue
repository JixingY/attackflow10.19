<template>
  <div>
    <!-- 顶部 logo 和标题 -->
    <div class="detail-header">
      <img src="@/assets/images/Logo.png" alt="Attack Flow Logo" class="detail-logo" />
      <span class="detail-title">Attack Flow</span>
    </div>

    <!-- 主内容区域 -->
    <div class="detail-content-wrapper">
      <div class="detail-content">
        <!-- Basic Information -->
        <div class="basic-info">
          <h2>{{ post.name }}</h2>
          <p>Date: {{ post.uploadDate }}</p>
          <p>Author: {{ post.author }}</p>
          <p>Annotator: {{ post.annotator }}</p>
          <p>Description: {{ post.description }}</p>

          <!-- 链式表格部分 -->
          <div v-if="annotationData">
            <!-- 由后端提供的链式表格内容 -->
          </div>
          <div v-else class="not-found">
            Database Not Found
          </div>
        </div>


        <!-- 右侧部分 -->
        <div class="right-section">
          <div class="version-select">
            <label for="version">Select version:</label>
            <select id="version">
              <!-- 示例版本数据，可能需要从API或其他数据源获取版本数据 -->
              <option v-for="version in versions" :key="version">{{ version }}</option>
            </select>
          </div>

          <div class="download-section">
            <button>Download original report</button>
            <button>Download attack flow model</button>
          </div>

          <button class="annotation-btn">Create new annotation</button>

          <!-- 评论功能（示例结构） -->
          <div class="comments-section">
            <h3>Comments</h3>
            <!-- 评论输入 -->
            <textarea placeholder="Add a comment..."></textarea>
            <button>Submit Comment</button>

            <!-- 示例评论列表 -->
            <div v-for="comment in comments" :key="comment.id" class="comment">
              <p>{{ comment.text }}</p>
              <span>{{ comment.author }} - {{ comment.date }}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// 示例数据
const post = ref({
  name: "Attack 1",
  uploadDate: "2023-09-01",
  author: "Author A",
  annotator: "Annotator X",
  description: "Description for Attack 1"
});

const versions = ['v1.0', 'v1.1', 'v2.0']; // 示例
const comments = [
  { id: 1, text: 'This is a comment.', author: 'User A', date: '2023-09-01' },
  // ... 其他评论数据
];
</script>


<style scoped>
/* 顶部导航栏样式 */
.detail-header {
  display: flex;
  align-items: center;
  background-color: rgb(98, 29, 186);
  padding: 10px 20px;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1001;
}

.detail-logo {
  height: 50px;
}

.detail-title {
  font-size: 30px;
  color: white;
  margin-left: 20px;
}

.detail-content-wrapper {
  padding-top: 120px;  /* 根据头部的大小进行调整 */
}

/* 详情页内容 */
.detail-content {
  padding: 20px 5%;
  display: flex;
  justify-content: space-between;
}

.basic-info {
  width: 70%;  /* 设置左侧基本信息的宽度 */
  margin-right: 5%;  /* 与右侧部分的间隔 */
}

.not-found {
  text-align: center;
  margin-top: 50px;
  font-size: 24px;
  color: red;
}

/* 基本信息样式 */
h2 {
  color: rgb(28, 125, 238);
  font-weight: bold;
}

/* 右侧部分样式 */
.right-section {
  width: 25%;
  padding: 20px;
  background-color: #f2f2f2; /* 右侧灰色背景 */
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
  position: sticky;
  top: 120px; /* 根据头部的大小进行调整 */
}

.version-select, .download-section, .comments-section {
  margin-bottom: 20px;
}

.version-select label {
  display: block;
  margin-bottom: 10px;
}

.download-section button, .annotation-btn, .comments-section button {
  display: block;
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  border: none;
  border-radius: 5px;
  background-color: rgb(28, 125, 238);
  color: white;
  cursor: pointer;
  text-align: center;
}

.annotation-btn {
  background-color: rgb(98, 29, 186); /* 紫色按钮 */
}

.comments-section textarea {
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  border-radius: 5px;
  resize: none;
}

.comment {
  border-top: 1px solid #ddd;
  padding-top: 10px;
  margin-top: 20px;
}

.comment span {
  display: block;
  font-size: 0.8em;
  color: #666;
}

</style>
