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
      <ClockListDesc :list="clockList" @clock-now="handleClockNow" />
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
import { clockQueue } from '../../utils/task-queue';
import { ipcRenderer } from 'electron';

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
  clockTime: any;
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
const clockList = ref<Clock[]>([]);

ipcRenderer.on('setConfig', (event, config) => {
  if (config.length) {
    clockList.value = config.map((item: any) => {
      item.clockTime = new Map();
      return item;
    });
  } else {
    clockList.value.push(
      {
        key: 0,
        title: '下班提醒',
        audio: zhangyugeAudio,
        desc: '我要说的是，如果有一天我真的实现了我生命中的梦想...',
        enable: true,
        week: [true, true, true, true, false, false, false], // 下标表示星期
        time: ['21:20:20', '23:33:25'],
        avatar: zhangyugeSrc,
        clockTime: new Map()
      }
    )
  }
  computedTimes();
})

const handleTimeStamp = (clockTimes: any[], clockInfo: Clock, nowDate: any) => {
  const clockTime = clockInfo.clockTime;
  clockTimes.sort((a, b) => a.time - b.time).forEach((timeInfo) => {
    if (!clockTime.has(timeInfo.key) && timeInfo.time > nowDate) {
      clockTime.set(timeInfo.key, timeInfo.time);
    }
  })
}

const dayTimeStamp = 86400000; // 一天的毫秒数
const computedTimes = () => {
  // 当天是周几
  const weekDay = dayjs().day();
  const nowDate = Date.now();
  clockList.value.forEach((clock) => {
    // 距离设置闹钟日的毫秒数
    let distanceTime = 0;
    for (let weekIndex = 0; weekIndex < 7; weekIndex++) {
      // 当前日有设置闹钟
      if (clock.week[(weekDay + weekIndex) % 7]) {
        distanceTime = weekIndex * dayTimeStamp;
        handleTimeStamp(clock.time.map((timeStr) => {
          const alarmTime = dayjs(timeStr, "HH:mm:ss").valueOf();
          console.log(alarmTime, distanceTime, 'distanceTime')
          return {
            key: timeStr,
            time: distanceTime + alarmTime
          };
        }), clock, nowDate)
        console.log(clock.clockTime.size)
        if (clock.clockTime.size) return;
      }
    }
  })
}

const handleClockNow = (timeInfo: Clock, key: string) => {
  const { title } = timeInfo;
  clockQueue.addTask(`${title}`, timeInfo, 30000, () => {
    timeInfo.clockTime.delete(key);
    computedTimes();
    console.log('end')
  });
  clockQueue.start();
}


// const timer = setInterval(computedTimes, 1000);
onBeforeUnmount(() => {
  // clearInterval(timer);
})

</script>

<style lang="scss" scoped></style>
