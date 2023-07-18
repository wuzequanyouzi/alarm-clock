<!--
 * @Author: zequan.wu
 * @Date: 2023-07-18 11:32:54
 * @LastEditors: zequan.wu
 * @LastEditTime: 2023-07-18 18:51:44
 * @FilePath: \alarm-clock\src\pages\home\Index.vue
 * @Description: 
 * 
-->
<template>
  <Layout :menu="menu">
    <template #content>
      <ClockListDesc :list="clockList" @clock-now="handleClockNow"/>
    </template>
  </Layout>
</template>

<script lang="ts" setup>
import { ref, onBeforeUnmount, onBeforeMount } from 'vue';
import Layout from '../../components/Layout.vue';
import dayjs from 'dayjs';
import ClockListDesc from './components/ClockListDesc.vue';
import zhangyugeSrc from '../../assets/images/zhangyuge.png';
import zhangyugeAudio from '../../assets/mp3/zhangyuge.mp3';

(window as any).dayjs = dayjs;

interface Clock {
  key: number;
  title: string;
  audio: string;
  desc: string;
  enable: boolean;
  week: boolean[];
  time: string[];
  avatar: string;
  clockTime: number[];
}

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
const clockList = ref<Clock[]>([
  {
    key: 0,
    title: '下班提醒',
    audio: '',
    desc: '我要说的是，如果有一天我真的实现了我生命中的梦想...',
    enable: true,
    week: [true, true, true, true, false, false, false], // 下标表示星期
    time: ['18:52:10'],
    avatar: zhangyugeSrc,
    clockTime: []
  },
]);

const clockTask = ref([]);
const dayTimeStamp = 86400000; // 一天的毫秒数
const computedTimes = () => {
  // 当天是周几
  const weekDay = dayjs().day();
  clockList.value.forEach((clock) => {
    // 距离设置闹钟日的毫秒数
    let distanceTime = 0;
    for (let weekIndex = 0; weekIndex < 7; weekIndex++) {
      // 当前日有设置闹钟
      if (clock.week[weekDay + weekIndex % 7]) {
        distanceTime = weekIndex * dayTimeStamp;
        clock.clockTime = clock.time.map((time) => {
          const alarmTime = dayjs(time, "HH:mm:ss").valueOf();
          return distanceTime + alarmTime;
        })
        return ;
      }
    }
  })
}

const handleClockNow = (timeInfo:Clock) => {
  console.log(timeInfo)
}


computedTimes();
// const timer = setInterval(computedTimes, 1000);
onBeforeUnmount(() => {
  // clearInterval(timer);
})

</script>

<style lang="scss" scoped></style>
