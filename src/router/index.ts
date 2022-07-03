import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../pages/home/Index.vue';
import playWindow from '../pages/play-window/index.vue';

const routes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/about',
    component: playWindow,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
