<script setup>
  import { useRouter } from 'vue-router';

  const router = useRouter();

  const goTo = (path) => {
    router.push(path);
  }
</script>

<template>
  <ul class="main">
    <li @click="goTo('/upload')">
      <img src="@/assets/images/Upload.png" alt="Upload Logo" class="btn-logo" />
      <span>Upload an incident report</span>
    </li>

    <li>
      <a href="https://center-for-threat-informed-defense.github.io/attack-flow/visualization/#att-ck-navigator">
      <img src="@/assets/images/Visual.png" alt="URL Logo" class="btn-logo" />
      <span>Visualize Attack Flow</span>
      </a>
    </li>

    <li @click="goTo('/database')">
      <img src="@/assets/images/Database.png" alt="Database Logo" class="btn-logo" />
      <span>Database</span>
    </li>
  </ul>
</template>

<style scoped>
.main{
  display: flex;
  list-style: none;
  padding: 0;
}
.main li{
  flex: 1;
  background-color: rgb(84, 95, 113);
  height: 400px;
  padding: 10px;
  margin: 70px;
  text-align: center;
  border-radius: 10px;
}
.main li:hover{
  background-color: rgb(98, 29, 186);
}
.btn-logo {
  height: 80px; /* 或其他合适的大小 */
  display: block;
  margin: 0 auto 20px;
}

.main li span, img {
  color: white;
  text-align: center;
  padding-top: 100px;
}
</style>