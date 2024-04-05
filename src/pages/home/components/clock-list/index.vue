<!--
 * @Author: zequan.wu
 * @Date: 2024-04-04 20:55:34
 * @LastEditors: zequan.wu
 * @LastEditTime: 2024-04-05 10:47:37
 * @FilePath: \alarm-clock\src\pages\home\components\clock-list\index.vue
 * @Description: 
 * 
-->
<template>
  <div class="clock-list">
    <el-card class="box-card" v-for="item in props.list" :shadow="current === item.key ? 'always' : 'hover'"
      @click="(event: Event) => handleClick(event, item)">
      <div class="clock-list--item">
        <div class="clock-list--item_top" :style="item.style">
          <div style="display: flex; align-items: center;">
            <el-avatar :size="50" :src="item.avatar" />
          </div>
          <div class="clock-list--item_desc">
            <div class="clock-list--item_desc-title">
              {{ item.title }}
            </div>
            <div class="clock-list--item_desc-content">
              {{ item.desc }}
            </div>
          </div>
        </div>
        <Transition name="enable">
          <div class="clock-list--item_bottom" :class="{ 'not-enable': !item.enable }" >
            <CountDown style="transform: translateY(-10px);" v-bind="$attrs" :clock="item" />
          </div>
        </Transition>
      </div>
    </el-card>
    <AddCard class="add-card" :shadow="current === ADD_KEY ? 'always' : 'hover'" @click="handleAdd"/>
  </div>
</template>

<script lang="ts" setup>
import { Clock } from '../../../../types/index'
import CountDown from "../countdown/index.vue";
import AddCard from './AddCard.vue';
import Day from "dayjs";
import { defineProps, PropType, ref, defineEmits } from "vue";
import { getInitClockInfo } from '@/utils/index'; 
const props = defineProps({
  list: {
    type: Array as PropType<Clock[]>,
    default: () => [],
  },
  currentKey: {
    type: Number,
    default: 1
  }
});

const ADD_KEY = -1;

const emit = defineEmits(["click", 'add']);

const current = ref(props.currentKey);

const handleClick = (event: Event, item: any) => {
  current.value = item.key;
  emit("click", item);
};

const handleAdd = () => {
  const clockInfo = getInitClockInfo();
  current.value = clockInfo.key;
  emit("add", clockInfo);
}

</script>

<style lang="scss" scoped>
.clock-list {
  padding: 10px;
  height: 100%;
  box-sizing: border-box;
  overflow-y: auto;

  &::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 2px;
    /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
  }

  &::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 5px rgba(40, 157, 253, 0.801);
    background: #535353;
  }

  &::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(102, 108, 112, 0.801);
    border-radius: 10px;
    background: #ededed;
  }

  :deep {
    .el-card {
      border: none;
    }

    .el-card__body {
      padding: 10px 10px 0;
    }
  }

  .box-card {
    cursor: pointer;
    margin-bottom: 4px;
  }

  &--item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    &_top {
      z-index: 1;
      padding: 14px 10px;
      display: flex;
      align-items: center;
      background-color: #937617;
      border-radius: 10px;
      margin-bottom: 10px;
    }

    &_desc {
      width: 200px;
      margin-left: 10px;

      &-title {
        font-size: 16px;
        margin-bottom: 4px;
      }

      &-content {
        font-size: 12px;
        color: #fff;
      }
    }

    &_bottom {
      width: 100%;
      height: 60px;
      transition: all 0.5s;
      transform: translateY(-10px);
    }
    
    .not-enable {
      height: 0;
      transform: translateY(-70px);
    }

    .enable-enter-active {
      animation: bounce-in 0.5s;
    }

    .enable-leave-active {
      animation: bounce-in 0.5s reverse;
    }
  }
  .add-card {
    margin-top: 8px;
  }
}
</style>
