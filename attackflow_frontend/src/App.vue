<template>
<div id="app">
<router-view></router-view>
</div>
</template>

<script >

import {defineComponent} from "vue";
import Home from "@/components/home/Home.vue";


export default defineComponent({
  components: {Home}
})
</script>

<style scoped>

</style>
