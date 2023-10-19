<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();

const navigateHome = () => {
  router.push('/');
}
</script>

<template>
<div class="header">
  <div class="header-content">
  <img src="@/assets/images/Logo.png" alt="">
  <div class="centered-content">
    <span><strong>Attack Flow</strong></span>
  </div>
  </div>
</div>

</template>

<style scoped>
.header{
  display: flex;
  height: 100px;
  background: linear-gradient(to bottom, rgb(98, 29, 186), rgb(255,255,255) );
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
}

.header img{
  height: 80px;
}

.header-content {
  display: flex;
  align-items: center;
}


.header span {
  font-size: 30px;
  color: white;
}
</style>