import { createApp } from 'vue';
import App from './App.vue';
// import './samples/node-api'

import router from './router';

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

import './assets/styles/iconfont.scss';

createApp(App)
  .use(router)
  .use(ElementPlus)
  .mount('#app')
  .$nextTick(() => {
    postMessage({ payload: 'removeLoading' }, '*');
  });
