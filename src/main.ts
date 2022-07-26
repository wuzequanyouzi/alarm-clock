import { createApp } from 'vue';
import App from './App.vue';
// import './samples/node-api'

import router from './router';

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';

import './assets/styles/iconfont.scss';

const app = createApp(App).use(router).use(ElementPlus);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.mount('#app').$nextTick(() => {
  postMessage({ payload: 'removeLoading' }, '*');
});
