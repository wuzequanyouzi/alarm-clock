<template>
  <MiniWindow v-if="!status" :audio-info="currentClockInfo" />
  <MainWindow v-else />
  <audio
    ref="audio"
    :src="`${currentClockInfo.audio}?time=${Date.now()}`"
  ></audio>
</template>

<script lang="ts" setup>
import { ipcRenderer } from 'electron';
import { nextTick, ref } from 'vue';
import MiniWindow from './components/MiniWindow.vue';
import MainWindow from './components/MainWindow.vue';
interface AudioInfo {
  key?: number;
  title?: string;
  audio?: string;
  desc?: string;
  enable?: boolean;
  date?: (string | number)[];
  time?: string[];
  avatar?: string;
  formatTime?: any;
  name?: string;
}
const status = ref(false);
const audio = ref(null);
const currentClockInfo = ref<AudioInfo>({});
ipcRenderer.on('send-audio', (event, audioInfo) => {
  status.value = false;
  currentClockInfo.value = JSON.parse(audioInfo);
  window.$audio = audio.value;
  nextTick(() => {
    audio.value?.play();
  });
});
</script>

<style lang="scss" scoped></style>
