<template>
  <div class="clock-desc">
    <div class="clock-desc-container">
      <div class="clock-desc--header">
        设置
      </div>
      <div class="clock-desc--body">
        <Block icon="icon-shijian" label="时间">
          <SelectClockDialog @submit="handleChangeTime" />
          <Time class="time-container" :time="_clockInfo.time"
            @remove="(time: any) => handleChangeTime(time, 'delete')" />
        </Block>
        
        <Block :size="26" icon="icon-music" label="铃声">
          <MusicItem :currentMusic="_clockInfo.audio"/>
        </Block>

        <Block icon="icon-riqi" label="重复设置">
          <WeekCheckbox style="margin-top: 10px;" v-model="_clockInfo.week" />
        </Block>

        <Block :size="26" icon="icon-enable" label="启用">
          <el-switch style="margin-top: 10px;" v-model="_clockInfo.enable" />
        </Block>
      </div>
    </div>
    <div class="save-button">
      <el-button class="button-dom" size="large" round @click="handleSave">保存</el-button>
      <el-button class="button-dom" size="large" round >预览</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Clock } from "../../../../types/index.d";
import Block from '../../../../components/Block.vue';
import Time from './time/index.vue';
import MusicItem from './music-item/Index.vue';
import WeekCheckbox from './week-checkbox/index.vue';
import { defineProps } from 'vue';
import SelectClockDialog from './select-clock-dialog/index.vue';
import { ElMessage } from 'element-plus'
import { ref, watch } from 'vue';
import dayjs from 'dayjs';

const props = defineProps({
  clockInfo: {
    type: Object as () => Clock,
    default: () => ({}),
  },
});

const _clockInfo = ref(props.clockInfo);

const emit = defineEmits(['save-config', 'change-time']);

const handleTry = (clockInfo: any) => {
  // ipcRenderer.send('clock-now', JSON.stringify(clockInfo));
  // emit('save-config', clockInfo)
};

watch(() => props.clockInfo, (newVal) => {
  _clockInfo.value = JSON.parse(JSON.stringify(newVal));
  console.log(_clockInfo)
})

const handleChangeTime = (time: number, type = 'add') => {
  const timeDate = dayjs(time);
  const hour = timeDate.hour();
  const minute = timeDate.minute();
  const second = timeDate.second();
  const timeStr = `${hour < 10 ? '0' + hour : hour}:${minute < 10 ? '0' + minute : minute}:${second < 10 ? '0' + second : second}`;
  if (type === 'add') {
    _clockInfo.value.time.push(timeStr)
  } else {
    _clockInfo.value.time = _clockInfo.value.time.filter(item => item !== timeStr);
  }
}

const checkClockInfo = () => {
  const { time, audio } = _clockInfo.value;
  if (!time || time.length === 0) {
    ElMessage.warning('请设置闹钟时间');
    return false;
  }
  if (!audio || !audio.path) {
    ElMessage.warning('请设置闹钟声音');
    return false;
  }
  return true;
}

const handleSave = () => {
  checkClockInfo() && emit('save-config', _clockInfo.value);
}
</script>

<style lang="scss" scoped>
.clock-desc {
  height: 100%;
  overflow-y: auto;
  padding: 10px 10px 0;
  box-sizing: border-box;
  position: relative;

  &-container {
    background-color: #edeef2;
    height: 100%;
    border-radius: 8px;
  }

  &--header {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    padding: 10px 15px;
    background-color: #e1e2e6;
  }

  &--body {
    padding: 10px;

    .time-container {
      margin-top: 10px;
    }
  }

  .save-button {
    margin: auto;
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    .button-dom {
      padding: 0 30px 0;
    }
  }
}
</style>
