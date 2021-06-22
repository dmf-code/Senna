import {
    createApp
} from 'vue'
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import App from './App.vue';
import Router from './router';
import store from './store/store';
import * as backend from '@/apis/backend/index';
import * as frontend from '@/apis/frontend/index';
import storage from '@/store/storage';
import {
    VMdEditor,
    VMdPreviewHtml
} from './bootstrap/markdown.js';

const app = createApp(App);
app.use(ElementPlus);
app.use(Router);
app.use(store);
app.use(VMdEditor);
app.use(VMdPreviewHtml);

// app.config.globalProperties.$store = store;
app.config.globalProperties.$api = {
    backend,
    frontend
};

app.config.globalProperties.$storage = storage;

app.mount('#app')