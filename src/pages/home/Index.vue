<!--
 * @Author: zequan.wu
 * @Date: 2023-07-18 11:32:54
 * @LastEditors: zequan.wu
 * @LastEditTime: 2024-04-05 12:51:07
 * @FilePath: \alarm-clock\src\pages\home\Index.vue
 * @Description: 
 * 
-->
<template>
  <Layout :menu="menu">
    <template #content>
      <ClockListDesc :list="clockList" @clock-now="handleClockNow" @save-config="handleSaveConfig"
        @change-time="handleChangeTime" />
    </template>
  </Layout>
</template>

<script lang="ts" setup>
import { Clock } from '@/types/index';
import { getNorMalClockList } from '@/config/index';
import { ref, onBeforeUnmount, onBeforeMount } from 'vue';
import Layout from '../../components/Layout.vue';
import dayjs from 'dayjs';
import ClockListDesc from './components/ClockListDesc.vue';
import zhangyugeSrc from '../../assets/images/zhangyuge.png';
import zhangyugeAudio from '../../assets/mp3/zhangyuge.mp3';
import { clockQueue } from '../../utils/task-queue';

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
          return {
            key: timeStr,
            time: distanceTime + alarmTime
          };
        }), clock, nowDate)
        if (clock.clockTime.size) return;
      }
    }

    // 没有计算出时间，说明没有设置重复，单次生效
    if (!clock.clockTime.size) {
      handleTimeStamp(clock.time.map((timeStr) => {
        const alarmTime = dayjs(timeStr, "HH:mm:ss").valueOf();
        if (alarmTime < nowDate) {
          distanceTime = 1 * dayTimeStamp;
        }
        return {
          key: timeStr,
          time: distanceTime + alarmTime
        };
      }), clock, nowDate)
    }
  })
}

const handleClockNow = (timeInfo: Clock, key: string) => {
  const nowDate = Date.now();
  const { key: _key } = timeInfo;
  // 以某个闹钟的key+对应时间标识唯一任务
  clockQueue.addTask(`${_key}_${key}`, timeInfo, 30000, () => {
    timeInfo.clockTime.delete(key);
    const afterNowDate = timeInfo.time.map((timeStr) => {
      return dayjs(timeStr, "HH:mm:ss").valueOf();
    }).some(item => item > nowDate)
    // 没有时间大于当前时间，并且没有开启重复设置
    if (!afterNowDate && !timeInfo.week.some(item => item)) {
      timeInfo.enable = false;
      // BUG：多了一个任务
      handleSaveConfig(timeInfo)
    } else {
      computedTimes();
    }
  });
  clockQueue.start();
}

const getSetting = () => {
  const settingTxt = localStorage.getItem('clock-setting');
  let setting = [];
  if (settingTxt) {
    setting = JSON.parse(settingTxt);
  }
  return setting;
}

const handleSaveConfig = (clockInfo: Clock) => {
  // TODO: 需要提示
  if (!clockInfo.time.length) return;
  // 保存设置，需要清除原有计算出来的闹钟倒计时时间
  clockInfo.clockTime = new Map();
  const findIndex = clockList.value.findIndex((item) => item.key === clockInfo.key);
  if (findIndex === -1) {
    clockList.value.push(clockInfo);
  } else {
    const findInfo = clockList.value[findIndex];
    Object.assign(findInfo, clockInfo);
  }
  computedTimes();
  localStorage.setItem('clock-setting', JSON.stringify(clockList.value));
}

const handleChangeTime = (clockInfo: Clock, time: number, type = 'add') => {
  const timeDate = dayjs(time);
  const hour = timeDate.hour();
  const minute = timeDate.minute();
  const second = timeDate.second();
  const timeStr = `${hour < 10 ? '0' + hour : hour}:${minute < 10 ? '0' + minute : minute}:${second < 10 ? '0' + second : second}`;
  if (type === 'add') {
    clockInfo.time.push(timeStr)
  } else {
    clockInfo.time = clockInfo.time.filter(item => item !== timeStr);
  }

}

const loadSetting = () => {
  const setting = getSetting();
  if (setting.length) {
    clockList.value = setting.map((item: any) => {
      item.clockTime = new Map();
      return item;
    })
  } else {
    clockList.value = getNorMalClockList();
  }
  computedTimes();
}

loadSetting();

// const timer = setInterval(computedTimes, 1000);
onBeforeUnmount(() => {
  // clearInterval(timer);
})

</script>

<style lang="scss" scoped></style>
