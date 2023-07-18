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
import { ref, watchEffect, defineEmits } from "vue";
interface Props {
  timeStamp: number,
  clock: any
}
const props = withDefaults(
  defineProps<Props>(),
  {
    timeStamp: 0,
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

const formatTime = (time: number) => {
  const nowTime = Date.now();
  const alarmTime = dayjs(time).valueOf();
  const diff = alarmTime - nowTime;
  if (diff < 0) {
    clearInterval(timer);
    time && emit('clock-now', props.clock);
    return {
      dd: 0,
      hh: 0,
      mm: 0,
      ss: 0,
    }
  }
  const dd = Math.floor(diff / 1000 / 60 / 60) % 24;
  const hh = Math.floor(diff / 1000 / 60 / 60) % 60;
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
  if (timer) {
    clearInterval(timer);
  }
  const time = dayjs(props.timeStamp).valueOf();
  timer = setInterval(() => {
    timeInfo.value = formatTime(time);
  }, 1000)
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
  transform: translateY(-10px);
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
