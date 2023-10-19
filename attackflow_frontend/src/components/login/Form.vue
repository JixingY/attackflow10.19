<template>
    <div>
        <div class="form-container">
            <form class="form" method="post" @submit.prevent="submitForm">
                <h2>Login</h2>
                <div v-if="error.status" class="error-message">
                    {{ errorMessage }}
                </div>
                <div class="form-group">
                    <input id="account" v-model="formData.account" placeholder="Enter your account" type="text" required>
                    <label for="account">
                        <i class="fas fa-user input-icon" />
                    </label>
                </div>
                <div class="form-group">
                    <input id="password" v-model="formData.password" placeholder="Enter your password" type="password"
                        required>
                    <label for="password">
                        <i class="fas fa-lock input-icon" />
                    </label>
                </div>
                <div class="form-group flex-container">
                    <label for="role" class="login-as-label">Role:</label>
                    <select id="role" name="role" v-model="formData.role">
                        <option value="" disabled selected>
                            Select an option
                        </option>
                        <option value="annotator" selected>
                            Annotator
                        </option>
                        <option value="admin">
                            Admin
                        </option>
                    </select>
                </div>
                <div class="form-group">
                    <input id="remember" type="checkbox" class="checkbox">
                    <label for="remember" class="remember-label">Remember me</label>
                </div>
                <button id="submit" type="submit">
                    Log In
                </button>
            </form>
            <br>
            <!--            <router-link to="/registration" id="registration">Forget Password?</router-link>-->
            <br>
            <router-link to="/register" id="registration">Don't have an account?</router-link>
        </div>
    </div>
</template>

<script>
import router from '@/router';
import axios from "axios";
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Form.vue",
    data() {
        return {
            formData: {
                account: '',
                password: '',
                role: ''
            },
            error: {
                message: 'Error if error',
                status: false
            }
        };
    },
    methods: {
        submitForm: function () {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*' // 允许所有来源
                }
            }
            axios.post('http://localhost:9999/login', this.formData, config)
                .then(res => {
                    //successfully login
                    console.log(res.data.user);
                    //alert( JSON.stringify(res.data.user));
                    localStorage.setItem("uid", res.data.user.id);
                    localStorage.setItem("account", res.data.user.account);
                    localStorage.setItem("isadmin", res.data.user.is_admin);
                    localStorage.setItem("password", res.data.user.password);
                    localStorage.setItem("phone", res.data.user.phone);
                    localStorage.setItem("email", res.data.user.email);
                    const password = localStorage.getItem("password");
                    console.log(password)
                    if (res.data.user.is_admin == 0) {
                        router.push('/');
                    } else {
                        router.push('/admin');
                    }

                })
                .catch(error => {
                    //fail to login
                })
        }
    }
};
</script>

<style scoped>
.form-container {
    border: 1px solid #ccc;
    padding: 20px;
    width: 300px;
    margin: 100px auto;
    text-align: center;
    border-radius: 10px;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
    height: 400px;
}

.form {
    display: flex;
    flex-direction: column;
    align-items: center;
}

h2 {
    margin-bottom: 20px;
}

.error-message {
    color: red;
    margin-bottom: 10px;
}

.form-group {
    margin-bottom: 15px;
    position: relative;
}

label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
}

input[type="text"],
input[type="password"],
select {
    width: 150%;
    padding: 10px;
    transform: translateX(-50px);
    border: 1px solid #ccc;
    border-radius: 4px;
}

select {
    font-size: 13px;
    width: 70%;
    line-height: 30px;
}

.checkbox {
    margin-right: 5px;
}

.remember-label {
    display: inline;
    margin-left: 5px;
}

.login-as-label {
    display: inline;
    width: 70px;
    font-size: 15px;
    transform: translateX(-50px);
}

.flex-container {
    display: flex;
    align-items: center;
}

button[type="submit"] {
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    padding: 10px 20px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s;
    /*height: 30px;*/
    /*line-height: 30px;*/
}

button[type="submit"]:hover {
    background-color: #0056b3;
}

.input-icon {
    position: absolute;
    top: 50%;
    left: -40px;
    transform: translateY(-70%);
    color: gray;
}

input[type="text"],
input[type="password"] {
    text-indent: 20px;
}
</style>
