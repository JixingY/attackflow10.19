import App from './App.vue'
import router from '@/router';
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import {createPinia} from "pinia";
import 'element-plus/dist/index.css'
import '@/assets/css/global.css';
import '@fortawesome/fontawesome-free/css/all.css';
const app = createApp(App)
const pinia = createPinia();


app.use(ElementPlus)
app.use(router)
app.use(pinia)
app.mount('#app')
