<template>
  <header class="header">
    <div class="left">
      <img :src="icon" alt="Icon" class="icon" />
    </div>
    <div class="right">
      <div class="user-info">
        <span class="username">{{ username }}</span>
        <img :src="userAvatar" alt="User Avatar" class="avatar" />
      </div>
    </div>
  </header>
</template>

<script>
import { ref } from "vue";

export default {
  setup(props) {
    const icon = ref("/src/assets/images/Logo.png");
    const username = ref("JohnDoe");
    const userAvatar =  ref("/src/assets/images/nomansland.jpeg");

    return {
      icon,
      userAvatar,
      username,
    };
  },
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #545c64;
  color: white;
  //margin: 0;
  //padding: 0;
}

.left {
  margin-right: 40px;
}

.icon {
  width: 40px;
  height: 40px;
}

.right {
  display: flex;
  align-items: center;
}

.user-info {
  display: flex;
  align-items: center;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}

.username {
  font-size: 16px;
  margin-right: 10px;
}
</style>
