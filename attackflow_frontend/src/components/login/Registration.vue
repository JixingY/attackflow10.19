<template>
  <div class="body">
    <div class="container">
      <div class="content">
      </div>
      <div class="background">
        <div class="box">
          <h2>Registration</h2>
          <form class="form" method="post" @submit.prevent="submitForm">
            <div class="input">
              <div class="inputbox">
                <span class="icon"><ion-icon name="accessibility-outline"></ion-icon></span>
                <input id="input_nav" v-model="formData.account" placeholder="Account" type="text" required @blur="validateAccount">
                <!--                                <label>Account </label>-->
                <span v-if="errors.account" class="error-message">Invalid Account</span>
              </div>
              <div class="inputbox">
                <span class="icon"><ion-icon name="mail-outline"></ion-icon></span>
                <input id="input_nav" v-model="formData.email" placeholder="Email" type="email" required @blur="validateEmail">
                <!--                                <label>Email</label>-->
                <span v-if="errors.email" class="error-message">Invalid Email</span>
              </div>
              <div class="inputbox">
                <span class="icon"><ion-icon name="lock-closed"></ion-icon></span>
                <input id="input_nav" v-model="formData.password" placeholder="Password" type="password" required @blur="validatePassword">
                <!--                                <label>Password</label>-->
                <span v-if="errors.password" class="error-message">Invalid Password</span>
              </div>
              <div class="inputbox">
                <span class="icon"><ion-icon name="lock-closed"></ion-icon></span>
                <input id="input_nav" v-model="formData.repassword" placeholder="Confirm Password" type="password" required @blur="validateRePassword">
                <!--                                <label>Confirm Password</label>-->
                <span v-if="errors.repassword" class="error-message">Passwords do not match</span>
              </div>
            </div><br>
            <button id="submit" type="submit">
              Sign up
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>


<script>

import router from "@/router";
import axios from "axios";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Registration.vue',
  data() {
    return {
      formData: {
        account: '',
        password: '',
        repassword: '',
        email: '',
        username: ''
      },
      errors: {
        account: false,
        password: false,
        repassword: false,
        email: false
      }
    };
  },
  methods: {
    validateAccount() {
      // replace with your actual regular expression
      const re = /^[a-zA-Z0-9]{6,}$/;
      this.errors.account = !re.test(this.formData.account);
    },
    validateEmail() {
      const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      this.errors.email = !re.test(this.formData.email);
    },
    validatePassword() {
      const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
      this.errors.password = !re.test(this.formData.password);
    },
    validateRePassword() {
      this.errors.repassword = this.formData.password !== this.formData.repassword;
    },
    submitForm() {
      this.validateAccount();
      this.validateEmail();
      this.validatePassword();
      this.validateRePassword();
      if (Object.values(this.errors).some((error) => error)) {
        // if there is any error, do not submit
        return;
      }
      console.log("ready to submit");
      // submit form

      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      };

      axios.post('http://localhost:9999/register',this.formData, config)
          .then(res =>{
            console.log(res.data.user);
            localStorage.setItem("account", res.data.user.account);
            const account = localStorage.getItem("account");
            alert('Register successful!');         
            setInterval(3000,)
            router.push('login');
      })
          .catch(error =>{
            console.log("Failed");
          })

    }

  }
};

</script>

<style scoped>
.body{
  min-height: 100vh;
  background: url('@/assets/images/cyber-security.jpg') no-repeat;
  background-size: cover;
}

.container{
  position: absolute;
  top:50%;
  left:50%;
  transform: translate(-50%, -50%);
  width: 75%;
  height: 550px;
  background: url('@/assets/images/cyber-security.jpg') no-repeat;
  background-size:cover;
  background-position: center;
  border-radius: 10px;
  margin-top: 20px;
}

.container .content{
  position: absolute;
  top: 0;
  left: 0;
  width: 58%;
  height: 100%;
}

.container .background{
  /*float: right;*/
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  width: calc(100% - 58%);
  background: transparent;
  backdrop-filter: blur(10px);
  box-shadow: 0 0 30px rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.box{
  width: 100%;
  padding: 40px;
}

.box h2{
  font-size: 2em;
  color: white;
  text-align: center;
  font-family: Arial, Helvetica, sans-serif;
}

.switch{
  width: 100%;
  display: flex;
  justify-content: space-between;
  height:min-content;
}

.switch button{
  background-color: black;
  border: black;
  color: white;
  border-radius: 6px;
  font-weight: 500;
  font-size: 0.8em;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.switch button:hover{
  background-color: aliceblue;
  color: gray;
}

.inputbox{
  position: relative;
  width: 100%;
  height: 50px;
  border-bottom: 2px solid whitesmoke;
  margin: 30px 0;
}

.inputbox label{
  position: absolute;
  top: 50%;
  left: 5px;
  transform: translateY(-50%);
  font-size: 1em;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: white;
  font-weight: 500;
  pointer-events: none;
  transition: 0.5s;
}

.inputbox input:focus~label,
.inputbox input:valid~lable{
  top: -5px;
}

.inputbox input{
  width: 100%;
  height: 100%;
  background: transparent;
  border: none;
  outline: none;
  font-size: 1em;
  color: gray;
  font-weight: 600;
  padding: 0 35px 0 5px;
}

.inputbox .icon{
  position: absolute;
  right: 8px;
  font-size: 1.2em;
  line-height: 57px;
  color: aliceblue;
}

.rememberMe{
  font-size: 0.9em;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-weight: 500;
  margin: -15px 0 15px;
  display: flex;
  justify-content: space-between;
  color: whitesmoke;
}

.rememberMe label input{
  accent-color: white;
  margin-right: 3px;
}

.rememberMe a{
  color: white;
  text-decoration: none;
}

.rememberMe a:hover{
  text-decoration: underline;
}

.choose label{
  color: ghostwhite;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-weight: 500;
  font-size: 1em;
  font-style: italic;
}

.choose select{
  color: white;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-weight: 500;
  border-radius: 4px;
  background: transparent;
}

.choose option{
  color: black;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-weight: 500;
  font-style: italic;
}

#submit{
  width:100%;
  height: 45px;
  background: black;
  border: none;
  outline: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1em;
  color: aliceblue;
  font-weight: 500;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

#submit:hover{
  background-color:gainsboro;
}

#input_nav::placeholder{
  color: white !important;
  font-weight: lighter;
}

#input_nav{
  color: white !important;
}
.error-message {
  color: red;
}


</style>
