import { createRouter, createWebHashHistory } from 'vue-router';
import Layout from '../components/Layout.vue';
import Home from '../pages/home/Index.vue';
import playWindow from '../pages/play-window/index.vue';
import Setting from '../pages/setting/Index.vue'

// 菜单
const menu = [
  {
    key: '0',
    label: '个性闹钟',
    icon: 'icon-lingsheng',
    name: 'Home'
  },
  {
    key: '1',
    label: '设置',
    icon: 'icon-chuanduo',
    name: 'Setting'
  },
];

const routes = [
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    props: {
      menu,
      keepAlive: ['Home', 'Setting']
    },
    children: [
      {
        path: 'home',
        name: 'Home',
        component: Home,
      },
      {
        path: 'setting',
        name: 'Setting',
        component: Setting,
      }
    ]
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
