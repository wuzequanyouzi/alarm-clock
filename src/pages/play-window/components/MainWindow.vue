<template>
  <div class="clock-main">
    <!-- 背景图片高斯模糊 -->
    <div class="clock-main-bg">
      <img class="image" :src="audioInfo.avatar" />
    </div>
    <div class="clock-main-container">
      <div class="clock-main-container__avatar">
        <img class="image avatar" :src="audioInfo.avatar" />
        <span>{{ audioInfo.name }}</span>
      </div>

      <div class="option">
        <div class="box break" @click="handleBreak">
          <i class="iconfont icon-guaduan"></i>
        </div>
        <span>取消</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, PropType, defineEmits } from 'vue';
interface AudioInfo {
  key?: number;
  title?: string;
  audio?: string;
  desc?: string;
  enable?: boolean;
  date?: (string | number)[];
  time?: string[];
  avatar?: string;
  formatTime?: any;
  name?: string;
}
const props = defineProps({
  audioInfo: {
    type: Object as PropType<AudioInfo>,
    default: () => ({}),
  },
});
const emits = defineEmits(['break']);

const handleBreak = () => {
  emits('break');
};
</script>

<style lang="scss" scoped>
.clock-main {
  height: 100%;
  position: relative;
  pointer-events: none;
  user-select: none;
  &-bg {
    width: 100%;
    height: 100%;
    position: absolute;
    display: flex;
    align-items: center;
    z-index: -1;
    background-color: #eee;
    filter: blur(10px) brightness(50%);
  }
  &-container {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 60px 0;
    box-sizing: border-box;
    &__avatar {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-top: 40px;
      & > span {
        margin-top: 10px;
        color: #fff;
      }
    }
  }
  .image {
    width: 100%;
  }
  .avatar {
    width: 100px;
    height: 100px;
    border-radius: 10px;
  }
  .option {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 12px;
    & > span {
      margin-top: 4px;
    }
  }
  .box {
    pointer-events: all;
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
  .break {
    background-color: #f44336;
  }
}
</style>
