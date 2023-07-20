<template>
  <div class="countdown">
    <div class="countdown-item" v-show="timeInfo.dd">
      <div class="countdown__container" >
        {{ timeInfo.dd }}
      </div>
      <div class="text">天</div>
    </div>
    <div class="countdown-item" v-show="timeInfo.hh">
      <div class="countdown__container" >
        {{ timeInfo.hh }}
      </div>
      <div class="text">时</div>
    </div>
    <div class="countdown-item" v-show="timeInfo.mm">
      <div class="countdown__container" >
        {{ timeInfo.mm }}
      </div>
      <div class="text">分</div>
    </div>
    <div class="countdown-item">
      <div class="countdown__container">
        {{ timeInfo.ss }}
      </div>
      <div class="text">秒</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import { ref, watchEffect, defineEmits, onBeforeUnmount } from "vue";
interface Props {
  clock: any
}
const props = withDefaults(
  defineProps<Props>(),
  {
    clock: {}
  }
);

const emit = defineEmits(['clock-now'])

const timeInfo = ref({
  dd: 0,
  hh: 0,
  mm: 0,
  ss: 0,
})
let timer:any = null;

const formatTime = (key:string, alarmTime: number) => {
  const nowTime = Date.now();
  const diff = alarmTime - nowTime;
  if (diff < 0) {
    clearInterval(timer);
    alarmTime && emit('clock-now', props.clock, key);
    return {
      dd: 0,
      hh: 0,
      mm: 0,
      ss: 0,
    }
  }
  const dd = Math.floor(diff / 1000 / 60 / 60 / 24) ;
  const hh = Math.floor(diff / 1000 / 60 / 60) % 24;
  const mm = Math.floor(diff / 1000 / 60) % 60;
  const ss = Math.floor(diff / 1000) % 60;
  return {
    dd,
    hh,
    mm,
    ss,
  };
};

watchEffect(() => {
  console.log(props.clock?.clockTime)
  if (timer) {
    clearInterval(timer);
  }
  const clockTime: any = Array.from(props.clock?.clockTime)[0];
  timeInfo.value = formatTime(clockTime[0], clockTime[1]);
  timer = setInterval(() => {
    timeInfo.value = formatTime(clockTime[0], clockTime[1]);
  }, 1000)
})

onBeforeUnmount(() => {
  if (timer) {
    clearInterval(timer);
  }
})

</script>

<style lang="scss" scoped>
.countdown {
  width: 100%;
  padding-top: 20px;
  padding-bottom: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ddd;
  border-radius: 0 0px 10px 10px;
  &-item {
    margin: 0 10px;
    width: 22px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .countdown__container {
      font-size: 18px;
      font-weight: 600;
    }
    .text {
      font-size: 12px;
    }
  }
}
</style>
