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
        <el-menu-item index="1-1"><span @click="goTo('/admin/viewprofile')">View Profile</span></el-menu-item>
        <el-menu-item index="1-2"><span @click="goTo('/admin/editprofile')">Edit Profile</span></el-menu-item>
      </el-sub-menu>
      <el-menu-item index="2">
        <el-icon><icon-menu /></el-icon>
        <span @click="goTo('/admin')">Manage Annotator</span>
      </el-menu-item>

      <el-sub-menu index="3">
        <template #title>
          <el-icon><location /></el-icon>
          <span>Report Requests</span>
        </template>
        <el-menu-item index="3-1"><span @click="goTo('/admin/documents1')">Pending Requests</span></el-menu-item>
        <el-menu-item index="3-2"><span @click="goTo('/admin/documents2')">Approved Requests</span></el-menu-item>
        <el-menu-item index="3-3"><span @click="goTo('/admin/documents3')">Rejected Requests</span></el-menu-item>
      </el-sub-menu>
      <el-menu-item index="4">
        <el-icon><icon-menu /></el-icon>
        <span @click="goTo('/admin/tags')">Manage Tags</span>
      </el-menu-item>
    </el-menu>
  </el-col>

</template>

<script lang="ts" setup>
import { ref } from 'vue'
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'
import Upload from "../upload/Upload.vue";

import { useRouter } from 'vue-router';

const router = useRouter();

const goTo = (path) => {
  router.push(path);
}

const isCollapse = ref(true)
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 250px;
  min-height: 800px;
}

</style>
