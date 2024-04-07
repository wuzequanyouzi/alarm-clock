<!--
 * @Author: zequan.wu
 * @Date: 2024-04-03 16:00:03
 * @LastEditors: zequan.wu
 * @LastEditTime: 2024-04-07 16:34:04
 * @FilePath: \alarm-clock\src\pages\play-window\components\MiniWindow.vue
 * @Description: 
 * 
-->
<template>
  <div class="clock-mini">
    <div class="clock-mini--avatar">
      <el-avatar :size="50" :src="audioInfo?.avatar?.blob" />
    </div>
    <div class="clock-mini--container">
      <span class="clock-mini--container-name">{{ audioInfo?.name }}</span>
      <div class="options">
        <div class="box connect" @click="handleConnect">
          <i class="iconfont icon-laidian"></i>
        </div>
        <div class="box break" @click="handleBreak">
          <i class="iconfont icon-guaduan"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Clock } from '../../../types/index';
import { defineProps, PropType, defineEmits } from 'vue';
const props = defineProps({
  audioInfo: {
    type: Object as PropType<Clock>,
    default: () => ({}),
  },
});

const emits = defineEmits(['connect', 'break']);

const handleConnect = () => {
  console.log('handleConnect');
  emits('connect');
};
const handleBreak = () => {
  emits('break');
};
</script>

<style lang="scss" scoped>
.clock-mini {
  user-select: none;
  width: 340px;
  height: 100px;
  background-color: #424347;
  display: flex;
  align-items: center;
  padding: 10px 20px;
  box-sizing: border-box;
  &--avatar {
    // pointer-events: none;
    margin-right: 10px;
  }
  &--container {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &-name {
      color: #fff;
    }

    .options {
      display: flex;
      justify-content: space-evenly;
      width: 150px;
      .box {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        cursor: pointer;
        .icon-laidian {
          font-size: 30px;
          color: #fff;
        }
        .icon-guaduan {
          font-size: 36px;
          color: #fff;
        }
      }
      .connect {
        background-color: #4caf50;
      }
      .break {
        background-color: #f44336;
      }
    }
  }
}
</style>
