<!--
 * @Author: zequan.wu
 * @Date: 2024-04-04 20:55:34
 * @LastEditors: zequan.wu
 * @LastEditTime: 2024-04-05 12:16:55
 * @FilePath: \alarm-clock\src\pages\play-window\index.vue
 * @Description: 
 * 
-->
<template>
  <MiniWindow
    v-if="!status"
    :audio-info="currentClockInfo"
    @connect="handleConnect"
    @break="handleBreak"
  />
  <MainWindow v-else :audio-info="currentClockInfo" @break="handleBreak" />
  <audio
    ref="audio"
    autoplay
    :src="currentPlayAudioSrc"
    @ended="handleEnd"
  ></audio>
</template>

<script lang="ts" setup>
import { Clock } from '@types/index.d';
import { nextTick, ref } from 'vue';
import MiniWindow from './components/MiniWindow.vue';
import MainWindow from './components/MainWindow.vue';
import _breakAudio from '../../assets/mp3/call-phone-end.mp3';
import _connectAudio from '../../assets/mp3/call-phone-start.mp3';

const { ipcRenderer } = window;

const status = ref(false);
const audio = ref<HTMLAudioElement>();
const currentClockInfo = ref<Clock>({});
const currentPlayAudioSrc = ref('');
const isEndClockMusic = ref(false);
ipcRenderer.on('send-audio', (event, audioInfo) => {
  status.value = false;
  isEndClockMusic.value = false;
  currentClockInfo.value = JSON.parse(audioInfo);
  currentPlayAudioSrc.value = `${
    currentClockInfo.value.audio.path
  }?time=${Date.now()}`;
  nextTick(() => {
    audio.value?.play();
  });
});

const handleEnd = () => {
  if (!isEndClockMusic.value) {
    handleBreak();
  } else {
    handleBreakEnd();
  }
};
const handleStart = () => {};

const handleBreakEnd = () => {
  ipcRenderer.send('audio-end');
};
const handleConnect = () => {
  console.log('handleConnect');
  ipcRenderer.send('connect');
  status.value = true;
};
const handleBreak = () => {
  audio.value?.pause();
  currentPlayAudioSrc.value = `${_breakAudio}?time=${Date.now()}`;
  isEndClockMusic.value = true;
};
</script>

<style>
html,
body {
  width: 100vw;
  height: 100vh;
}
</style>
<style lang="scss" scoped></style>
