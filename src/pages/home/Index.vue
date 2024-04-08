<!--
 * @Author: zequan.wu
 * @Date: 2023-07-18 11:32:54
 * @LastEditors: zequan.wu
 * @LastEditTime: 2024-04-08 10:55:42
 * @FilePath: \alarm-clock\src\pages\home\Index.vue
 * @Description: 
 * 
-->
<template>
  <ClockListDesc :list="clockList" @clock-now="handleClockNow" @save-config="handleSaveConfig"
    @change-time="handleChangeTime" @try-play="handleTryPlay" @remove="handleRemove"/>
</template>

<script lang="ts">
export default {
  name: 'Home'
}
</script>

<script lang="ts" setup>
import { Clock } from '@/types/index';
import { getNorMalClockList } from '@/config/index';
import { ref, onBeforeUnmount, onBeforeMount } from 'vue';
import Layout from '../../components/Layout.vue';
import dayjs from 'dayjs';
import ClockListDesc from './components/ClockListDesc.vue';
import { clockQueue } from '../../utils/task-queue';
import { getUrlByFile } from '../../utils/handleFile';
import { ElMessage } from 'element-plus';

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
    if (key !== 'try-play') {
      timeInfo.clockTime.delete(key);
    }
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

const handleTryPlay = (timeInfo: Clock) => {
  const _ = {
    ...timeInfo,
    key: 'try'
  }
  if (clockQueue.getTaskLength() > 0) {
    ElMessage.warning('请先停止当前闹钟');
    return;
  }
  const { key } = _;
  const tryKey = `${key}_try-play`;
  // TODO: 预览的时候，有个时延任务，如何跳过
  if (clockQueue.findTask(tryKey) || clockQueue.getCurrentTask()?.name === tryKey) {
    ElMessage.warning('正在预览!');
    return;
  }
  handleClockNow(_, 'try-play');
}

const handleRemove = (clockInfo: Clock) => {
  const findIndex = clockList.value.findIndex((item) => item.key === clockInfo.key);
  if (findIndex !== -1) {
    clockList.value.splice(findIndex, 1);
    localStorage.setItem('clock-setting', JSON.stringify(clockList.value));
  }
}

const getSetting = () => {
  const settingTxt = localStorage.getItem('clock-setting');
  let setting = [];
  if (settingTxt) {
    setting = JSON.parse(settingTxt).map(item => {
      return {
        ...item,
        avatar: {
          ...item.avatar,
          blob: item.avatar.normal ? item.avatar.blob : ''
        }
      }
    });
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
    clockList.value.forEach((item) => {
      !item.avatar.normal && getUrlByFile(item.avatar.path).then((blob: string) => {
        item.avatar.blob = blob;
      })
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
