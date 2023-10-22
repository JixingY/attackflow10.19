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
          Pending Requests
          <div class="handle-box" style="margin-top: 20px;">

          </div>
          <el-table v-loading="loading" :data="documentslist" row-key="id">
            <el-table-column prop="id" label="ID"></el-table-column>
            <el-table-column prop="document_no" label="document_no"></el-table-column>
            <el-table-column prop="document_name" label="document_name"></el-table-column>
            <el-table-column prop="version_number" label="version_number"></el-table-column>
            <el-table-column label="status" align="center">
              <template #default="scope">
                <span v-if="scope.row.status == 0">
                  Pending
                </span>
              </template>
            </el-table-column>
            <el-table-column prop="createdAt" label="createTime"></el-table-column>
            <el-table-column label="operate" align="center" style="width: 200px;">
              <template #default="scope">
                <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">view annotions
                </el-button>
                <!--el-button type="text" icon="el-icon-delete" class="red"
                    @click="handleDelete(scope.$index, scope.row)">delete</el-button-->
              </template>
            </el-table-column>
          </el-table>

          <el-dialog title="view annotions" v-model="editVisible" width="60%">
            <el-form label-width="100px">
              <el-form-item label="document_no">
                ：<el-input v-model="annotations.document_no" style="width:40%;"></el-input>
              </el-form-item>
              <el-form-item label="document_name">
                ：<el-input v-model="form.document_name" style="width:40%;"></el-input>
              </el-form-item>
              <el-form-item label="referenced_text">
                ：<span>{{ referencedTexts.referenced_text }}</span>
              </el-form-item>
              <el-form-item label="annotator">
                ：<el-input v-model="user.account" style="width:40%;"></el-input>
              </el-form-item>
            </el-form>
            <template #footer>
              <span class="dialog-footer">
                <el-button @click="editVisible = false">cancel</el-button>
                <el-button type="primary" @click="approve">approve</el-button>
                <el-button type="primary" @click="reject">reject</el-button>
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
const documentslist = ref([])

let form = reactive({
  id: "",
  document_name: "",
  referenced_text: ""
});
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
const annotations = ref([])
const referencedTexts = ref([])
const user = ref([])
const handleEdit = (index, row) => {
  //console.log(row)
  Object.keys(row).forEach((item) => {
    form[item] = row[item];
  });
  axios.post('http://localhost:9999/documents/getannotions', form)
    .then(res => {
      //successfully login
      console.log(res.data);
      annotations.value = res.data.annotations
      referencedTexts.value = res.data.referencedTexts
      user.value = res.data.user
      console.log(referencedTexts.value);
      editVisible.value = true;
    })
    .catch(error => {
      console.log(error);
    })



};
const approve = (index, row) => {

  axios.post('http://localhost:9999/documents/approveannotions', form)
    .then(res => {
      //successfully login
      console.log(res.data);
      editVisible.value = false;
      window.location.reload()
    })
    .catch(error => {
      console.log(error);
    })



};
const reject = (index, row) => {

axios.post('http://localhost:9999/documents/rejectannotions', form)
  .then(res => {
    //successfully login
    console.log(res.data);
    editVisible.value = false;
    window.location.reload()
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