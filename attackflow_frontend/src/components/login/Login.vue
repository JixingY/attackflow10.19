<template>
    <div class="body">
    <div class="main">
      <br>
      <h1 id="welcome">
        Welcome to our project!
      </h1>
      <Form/>

    </div>
    </div>
</template>

<script>
import Form from "@/components/login/Form.vue";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Login.vue',
  components: {
    Form,
  },
  data() {
    return {
      username: '',
      password: '',
    };
  },
};
</script>

<style scoped>
/* Add your component-specific styles here */
#welcome {
  float: left;
  margin-left: 20px;
}



.body{
  height: 100vh;
  background-color: rgb(234, 237, 237);
  background-image: url("@/assets/images/loginimg.jpg");
  background-repeat: repeat;
  background-size: cover;

}

</style>