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
          Manage Annotator
          <el-table v-loading="loading" :data="userlist" row-key="id">
            <el-table-column prop="id" label="ID"></el-table-column>
            <el-table-column prop="account" label="account"></el-table-column>
            <el-table-column prop="email" label="email"></el-table-column>
            <el-table-column prop="phone" label="phone"></el-table-column>
            <el-table-column label="isAdmin" align="center">
              <template #default="scope">
                <span v-if="scope.row.is_admin == 0">
                  NO
                </span>
                <span v-if="scope.row.is_admin == 1">
                  YES
                </span>
              </template>
            </el-table-column>
            <el-table-column label="status" align="center">
              <template #default="scope">
                <span v-if="scope.row.astatus == 0">
                  Pending
                </span>
                <span v-if="scope.row.astatus == 1">
                  Approved
                </span>
                <span v-if="scope.row.astatus == 2">
                  Rejected
                </span>
              </template>
            </el-table-column>
            <el-table-column prop="createdAt" label="createTime"></el-table-column>
            <el-table-column label="operate" align="center" style="width: 200px;">
              <template #default="scope">
                <el-button type="text" icon="el-icon-edit" @click="handleVerify(scope.row, 1)"
                  v-if="scope.row.astatus == 0 || scope.row.astatus == 2"> activate
                </el-button>
                <el-button type="text" icon="el-icon-edit" @click="handleVerify(scope.row, 2)"
                  v-if="scope.row.astatus == 0 || scope.row.astatus == 1">freeze
                </el-button>
                <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">edit
                </el-button>
                <!--el-button type="text" icon="el-icon-delete" class="red"
                  @click="handleDelete(scope.$index, scope.row)">delete</el-button-->
              </template>
            </el-table-column>
          </el-table>

          <el-dialog title="EditAnnotator" v-model="editVisible" width="40%">
            <el-form label-width="70px">
              <el-form-item label="account">
                <el-input v-model="form.account" style="width:40%;"></el-input>
              </el-form-item>
              <el-form-item label="email">
                <el-input v-model="form.email" style="width:40%;"></el-input>
              </el-form-item>
              <el-form-item label="phone">
                <el-input v-model="form.phone" style="width:40%;"></el-input>
              </el-form-item>
              <el-form-item label="isAdmin">
                <el-radio-group v-model="form.is_admin" style="width: 40%;">
                  <el-radio label="1" value="1" key="1">YES</el-radio>
                  <el-radio label="0" value="0" key="0">NO</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-form>
            <template #footer>
              <span class="dialog-footer">
                <el-button @click="editVisible = false">cancel</el-button>
                <el-button type="primary" @click="saveEdit">confirm</el-button>
              </span>
            </template>
          </el-dialog>
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
const userlist = ref([])
let form = reactive({
  id: "",
  account: "",
  email: "",
  phone: "",
  is_admin: 0,
});
let param = reactive({
  id: "",
  astatus: 0
});
const editVisible = ref(false);
axios.post('http://localhost:9999/userslist')
  .then(res => {
    //successfully login
    console.log(res.data.users);
    userlist.value = res.data.users
    console.log(userlist.value);

  })
  .catch(error => {
    console.log(error);
  })
const handleEdit = (index, row) => {

  console.log(row)
  Object.keys(row).forEach((item) => {
    form[item] = row[item];
  });
  editVisible.value = true;
};
const saveEdit = () => {


  axios.post('http://localhost:9999/edituser', form)
    .then(res => {
      //successfully login
      console.log(res.data.users);
      userlist.value = res.data.users
      console.log(userlist.value);
      editVisible.value = false;

    })
    .catch(error => {
      console.log(error);
    })
};

const handleVerify = (row, type) => {
  console.log(type);

  param['id'] = row['id'];
  param['astatus'] = type;
  axios.post('http://localhost:9999/verifyuser', param)
    .then(res => {
      //successfully login
      console.log(res.data.users);
      userlist.value = res.data.users
      console.log(userlist.value);
    })
    .catch(error => {
      console.log(error);
    })
};

const handleDelete  = (index, row) => {

  param['id'] = row['id'];
  axios.post('http://localhost:9999/deleteuser', param)
    .then(res => {
      //successfully login
      console.log(res.data.users);
      userlist.value = res.data.users
      console.log(userlist.value);
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