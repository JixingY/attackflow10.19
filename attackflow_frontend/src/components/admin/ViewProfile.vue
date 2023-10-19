<template>
    <div class="common-layout">
      <el-container>
        <el-header style="padding: 0">
          <Header></Header>
        </el-header>
        <el-container id="aside" width="300px">
          <el-aside width="250px">
            <Aside></Aside>
          </el-aside>
          <el-main id="main">
            Profile
            <div class="handle-box" style="margin-top: 20px;">
                account:<el-input v-model="profileform.username" placeholder="" class="handle-input mr10"></el-input>
            </div>
            <div class="handle-box" style="margin-top: 20px;">
                password:<el-input v-model="profileform.password" placeholder="" class="handle-input mr10"></el-input>
            </div>
            <div class="handle-box" style="margin-top: 20px;">
                phone:<el-input v-model="profileform.phone" placeholder="" class="handle-input mr10"></el-input>
            </div>
            <div class="handle-box" style="margin-top: 20px;">
                email:<el-input v-model="profileform.email" placeholder="" class="handle-input mr10"></el-input>
            </div>
            <div class="handle-box" style="margin-top: 20px;">
                isAdmin:
                <el-radio-group v-model="profileform.is_admin" style="width: 40%;">
                  <el-radio label="1" value="1" key="1">YES</el-radio>
                  <el-radio label="0" value="0" key="0">NO</el-radio>
                </el-radio-group>
            </div>
          </el-main>
        </el-container>
      </el-container>
    </div>
  </template>
    
  <script setup>
  import { ref, reactive } from "vue";
  import Aside from "@/components/admin/Aside.vue";
  import Header from "@/components/admin/Header.vue";
  import axios from 'axios';
  const documentslist = ref([])
  let form = reactive({
    id: "",
    document:"",
    referenced_text:""
  });
  let profileform = reactive({
    id:"",
    username: "",
    password:"",
    phone:"",
    email:"",
    is_admin:""
  });
  profileform['id'] = localStorage.getItem("uid");
  profileform['username'] = localStorage.getItem("account");
  profileform['isadmin'] = localStorage.getItem("isadmin");
  profileform['password'] = localStorage.getItem("password");
  profileform['phone'] = localStorage.getItem("phone");
  profileform['email'] = localStorage.getItem("email");
  console.log(profileform);
  const editVisible = ref(false);
  const addVisible = ref(false);
  
  axios.post('http://localhost:9999/documents/documents1')
    .then(res => {
      //successfully login
      console.log(res.data.documents);
      documentslist.value = res.data.documents
      console.log(documentslist.value);
  
    })
    .catch(error => {
      console.log(error);
    })
  const handleEdit = (index, row) => {
    console.log(row)
    Object.keys(row).forEach((item) => {
      form[item] = row[item];
    });
    axios.post('http://localhost:9999/documents/getannotions',form)
    .then(res => {
      //successfully login
      console.log(res.data.annotations);
      editVisible.value = true;
    })
    .catch(error => {
      console.log(error);
    })
  
    
    
  };
  
  const addTags = () => {
  
    addVisible.value = true;
  };
  
  
  const saveAdd = () => {
  
  
  axios.post('http://localhost:9999/addtags', form)
    .then(res => {
      console.log(res.data.tags);
      documentslist.value = res.data.tags
      addVisible.value = false;
  
    })
    .catch(error => {
      console.log(error);
    })
  };
  const saveEdit = () => {
  
  
    axios.post('http://localhost:9999/edittags', form)
      .then(res => {
        //successfully login
        console.log(res.data.tags);
        documentslist.value = res.data.tags
        console.log(documentslist.value);
        editVisible.value = false;
  
      })
      .catch(error => {
        console.log(error);
      })
  };
  
  </script>
    
    
  <style scoped>
  #main {
    border: 1px solid black;
    margin-left: 10px;
  }
  
  #aside {}
  </style>