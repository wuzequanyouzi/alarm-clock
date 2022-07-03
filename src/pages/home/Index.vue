<template>
  <Layout :menu="menu">
    <template #content>
      <ClockListDesc :list="clockList" />
    </template>
  </Layout>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import Layout from '../../components/Layout.vue';
import ClockListDesc from './components/ClockListDesc.vue';
import zhangyugeSrc from '../../assets/images/zhangyuge.png';
import zhangyugeAudio from '../../assets/mp3/zhangyuge.mp3';

// 菜单
const menu = ref([
  {
    key: '0',
    label: '个性闹钟',
    icon: 'icon-lingsheng',
  },
  {
    key: '1',
    label: '设置',
    icon: 'icon-chuanduo',
  },
]);

// 铃声列表
const clockList = ref([
  {
    key: 0,
    title: '下班提醒',
    audio: zhangyugeAudio,
    desc: '我要说的是，如果有一天我真的实现了我生命中的梦想...',
    enable: true,
    date: [0, 1, 2, 3, 4, ''],
    time: ['17:40:30'],
    avatar: zhangyugeSrc,
    formatTime: {},
    name: '章鱼哥',
  },
  {
    key: 0,
    title: '下班提醒',
    audio: zhangyugeAudio,
    desc: '我要说的是，如果有一天我真的实现了我生命中的梦想...',
    enable: true,
    date: [0, 1, 2, 3, 4, ''],
    time: ['17:40:30'],
    avatar: zhangyugeSrc,
    formatTime: {},
  },
  {
    key: 0,
    title: '下班提醒',
    audio: zhangyugeAudio,
    desc: '我要说的是，如果有一天我真的实现了我生命中的梦想...',
    enable: true,
    date: [0, 1, 2, 3, 4, ''],
    time: ['17:40:30'],
    avatar: zhangyugeSrc,
    formatTime: {},
  },
  {
    key: 0,
    title: '下班提醒',
    audio: '',
    desc: '我要说的是，如果有一天我真的实现了我生命中的梦想...',
    enable: true,
    date: [0, 1, 2, 3, 4, ''],
    time: ['17:40:30'],
    avatar: zhangyugeSrc,
    formatTime: {},
  },
  {
    key: 0,
    title: '下班提醒',
    audio: '',
    desc: '我要说的是，如果有一天我真的实现了我生命中的梦想...',
    enable: true,
    date: [0, 1, 2, 3, 4, ''],
    time: ['17:40:30'],
    avatar: zhangyugeSrc,
    formatTime: {},
  },
  {
    key: 0,
    title: '下班提醒',
    audio: '',
    desc: '我要说的是，如果有一天我真的实现了我生命中的梦想...',
    enable: true,
    date: [0, 1, 2, 3, 4, ''],
    time: ['17:40:30'],
    avatar: zhangyugeSrc,
    formatTime: {},
  },
  {
    key: 0,
    title: '下班提醒',
    audio: '',
    desc: '我要说的是，如果有一天我真的实现了我生命中的梦想...',
    enable: true,
    date: [0, 1, 2, 3, 4, ''],
    time: ['17:40:30'],
    avatar: zhangyugeSrc,
    formatTime: {},
  },
  {
    key: 0,
    title: '下班提醒',
    audio: '',
    desc: '我要说的是，如果有一天我真的实现了我生命中的梦想...',
    enable: true,
    date: [0, 1, 2, 3, 4, ''],
    time: ['17:40:30'],
    avatar: zhangyugeSrc,
    formatTime: {},
  },
  {
    key: 0,
    title: '下班提醒',
    audio: '',
    desc: '我要说的是，如果有一天我真的实现了我生命中的梦想...',
    enable: true,
    date: [0, 1, 2, 3, 4, ''],
    time: ['17:40:30'],
    avatar: zhangyugeSrc,
    formatTime: {},
  },
  {
    key: 0,
    title: '下班提醒',
    audio: '',
    desc: '我要说的是，如果有一天我真的实现了我生命中的梦想...',
    enable: true,
    date: [0, 1, 2, 3, 4, ''],
    time: ['17:40:30'],
    avatar: zhangyugeSrc,
    formatTime: {},
  },
  {
    key: 0,
    title: '下班提醒',
    audio: '',
    desc: '我要说的是，如果有一天我真的实现了我生命中的梦想...',
    enable: true,
    date: [0, 1, 2, 3, 4, ''],
    time: ['17:40:30'],
    avatar: zhangyugeSrc,
    formatTime: {},
  },
  {
    key: 0,
    title: '下班提醒',
    audio: '',
    desc: '我要说的是，如果有一天我真的实现了我生命中的梦想...',
    enable: true,
    date: [0, 1, 2, 3, 4, ''],
    time: ['17:40:30'],
    avatar: zhangyugeSrc,
    formatTime: {},
  },
]);
</script>

<style lang="scss" scoped></style>
