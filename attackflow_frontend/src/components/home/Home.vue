<template>
<!--<Navi></Navi>-->
<!--  <h2>Add whatever you like right here in home page</h2>-->
  <div class="common-layout">
    <el-container>
      <el-header style="padding: 0">
      <Header/>
      </el-header>
        <div class="login" v-if="account">
          <div style="margin-left: 80%;">Hello,{{ account }}！</div>
          <button class="btn" @click="goTo('annotator')">profile</button>
          <button class="btn" @click="exit()">exit</button>
        </div>
        <div class="login"  v-else>
          <button class="btn" @click="goTo('register')">Sign up</button>
          <button class="btn" @click="goTo('login')">Log in</button>
        </div>
        
      <el-main><Main></Main></el-main>
      <el-footer style="padding:0;">Footer</el-footer>
    </el-container>
  </div>
</template>

<script setup>

import Main from "@/components/home/Main.vue";
import Header from "@/components/home/Header.vue";


import { useRouter } from 'vue-router';

const router = useRouter();

const goTo = (path) => {
  router.push(path);
}
const account = localStorage.getItem("account");
const role = localStorage.getItem("isadmin");

const exit = () => {
  localStorage.setItem("account","");
  localStorage.setItem("isadmin", "");
  router.push('/');
}
</script>


<style scoped>
el-header {
  background: linear-gradient(180deg, rgb(84, 95, 113), transparent);
}
h2{
  margin-top: 100px;
 text-align: center;
}
.header-logo {
  height: 50px; /* 或其他合适的大小 */
  vertical-align: middle;
}

.header-title {
  color: white;
  font-size: 24px;
  vertical-align: middle;
}
.login{
  transform: translate(-10px,50px);

}
.btn{
  float: right;
  width: 65px;
  margin-right: 5px;
}
</style>