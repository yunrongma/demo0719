import './assets/main.css'
import router from './router/routes.js'; // 引入router插件

import { createApp } from 'vue'
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import App from './App.vue';

const app = createApp(App);
app.use(ElementPlus);
app.use(router); // 使用router插件
app.mount('#app');





