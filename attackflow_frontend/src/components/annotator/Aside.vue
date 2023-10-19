<template>
  <el-col :span="12">
    <el-menu
        active-text-color="#ffd04b"
        background-color="#545c64"
        class="el-menu-vertical-demo"
        default-active="2"
        text-color="#fff"
        @open="handleOpen"
        @close="handleClose"
    >
      <el-sub-menu index="1">
        <template #title>
          <el-icon><location /></el-icon>
          <span>Profile</span>
        </template>
        <el-menu-item index="1-1" @click="goTo('/annotator/view_profile')">View Profile</el-menu-item>
        <el-menu-item index="1-2">Edit Profile</el-menu-item>
      </el-sub-menu>
      <el-menu-item index="2">
        <el-icon><icon-menu /></el-icon>
        <span>Upload Incident Report</span>
      </el-menu-item>

      <el-sub-menu index="3">
        <template #title>
          <el-icon><location /></el-icon>
          <span>Report Requests</span>
        </template>
        <el-menu-item index="3-1">Pending Requests</el-menu-item>
        <el-menu-item index="3-2">Approved Requests</el-menu-item>
        <el-menu-item index="3-3">Rejected Requests</el-menu-item>
      </el-sub-menu>
    </el-menu>
  </el-col>

</template>

<script lang="ts" setup>
import { ref } from 'vue'
import {
  Document,
  Goblet,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'
import Upload from "../upload/Upload.vue";
import router from '../../router';

const isCollapse = ref(true)
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
function goTo(path){
  router.push(path);
}


</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 250px;
  min-height: 800px;
}

</style>
