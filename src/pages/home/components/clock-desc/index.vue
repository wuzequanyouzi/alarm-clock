<template>
  <div class="clock-desc">
    <div class="clock-desc-container">
      <div class="clock-desc--header">
        设置
        <span @click="handleTry(clockInfo)">试听</span>
      </div>
      <div class="clock-desc--body">
        <Block icon="icon-shijian" label="时间">
          <SelectClockDialog @submit="handleChangeTime" />
          <Time class="time-container" :time="props.clockInfo.time"
            @remove="(time: any) => handleChangeTime(time, 'delete')" />
        </Block>
        <Block icon="icon-riqi" label="重复设置">
          <WeekCheckbox style="margin-top: 10px;" v-model="props.clockInfo.week" />
        </Block>
        <Block icon="icon-enable" label="启用">
          <el-switch style="margin-top: 10px;" v-model="props.clockInfo.enable" />
        </Block>
      </div>
    </div>
    <div class="save-button"><el-button size="large" round @click="handleSave">保存</el-button></div>
  </div>
</template>

<script lang="ts" setup>
import Block from '../../../../components/Block.vue';
import Time from './time/index.vue';
import WeekCheckbox from './week-checkbox/index.vue';
import { defineProps } from 'vue';
import SelectClockDialog from './select-clock-dialog/index.vue';

const props = defineProps({
  clockInfo: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(['save-config', 'change-time']);

const handleTry = (clockInfo: any) => {
  // ipcRenderer.send('clock-now', JSON.stringify(clockInfo));
  // emit('save-config', clockInfo)
};

const handleChangeTime = (time: number, type = 'add') => {
  emit('change-time', props.clockInfo, time, type)
};

const handleSave = () => {
  emit('save-config', props.clockInfo)
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
  }
}
</style>
