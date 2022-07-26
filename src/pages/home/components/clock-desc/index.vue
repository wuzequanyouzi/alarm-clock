<template>
  <div class="clock-desc">
    <div class="clock-desc-container">
      <div class="clock-desc--header">
        设置
        <span @click="handleTry(clockInfo)">试听</span>
      </div>
      <div class="clock-desc--body">
        <div class="clock-desc--body-item">
          <div class="clock-desc--body-item-left">
            <i class="iconfont icon-shijian"></i>
          </div>
          <div class="clock-desc--body-item-right">
            <span>时间</span>
            <SelectClockDialog @submit="handleSelectTime" />
          </div>
        </div>
        <div class="clock-desc--body-item">
          <div class="clock-desc--body-item-left">
            <i class="iconfont icon-riqi"></i>
          </div>
          <div class="clock-desc--body-item-right">
            <span>日期</span>
          </div>
        </div>
        <div class="clock-desc--body-item">
          <div class="clock-desc--body-item-left">
            <i class="iconfont icon-enable"></i>
          </div>
          <div class="clock-desc--body-item-right">
            <span>启用</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ipcRenderer } from 'electron';
import { defineProps } from 'vue';
import SelectClockDialog from '../select-clock-dialog/index.vue';

const props = defineProps({
  clockInfo: {
    type: Object,
    default: () => ({}),
  },
});

const handleTry = (clockInfo: any) => {
  console.log(clockInfo);
  ipcRenderer.send('clock-now', JSON.stringify(clockInfo));
};

const handleSelectTime = (time: number) => {
  console.log(time);
};
</script>

<style lang="scss" scoped>
.clock-desc {
  height: 100%;
  overflow-y: auto;
  padding: 10px 10px 0;
  box-sizing: border-box;
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
    &-item {
      margin-bottom: 10px;
      display: flex;
      &-left {
        padding: 10px;
        .iconfont {
          font-size: 30px;
        }
      }
      &-right {
        padding-top: 10px;
      }
    }
  }
}
</style>
