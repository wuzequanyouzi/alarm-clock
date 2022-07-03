<template>
  <div
    class="clock-list"
    v-infinite-scroll="handleScrollBottom"
    :infinite-scroll-delay="500"
  >
    <el-card
      class="box-card"
      v-for="item in clockList"
      shadow="hover"
      @click="(event) => handleClick(event, item)"
    >
      <div class="clock-list--item">
        <div class="clock-list--item_top">
          <div>
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
        <div class="clock-list--item_bottom">
          <div class="clock-list--item_bottom-item">
            <div class="clock-list--item_bottom-item-time">
              {{ item.formatTime.dd }}
            </div>
            <div>天</div>
          </div>
          <div class="clock-list--item_bottom-item">
            <div class="clock-list--item_bottom-item-time">
              {{ item.formatTime.hh }}
            </div>
            <div>时</div>
          </div>
          <div class="clock-list--item_bottom-item">
            <div class="clock-list--item_bottom-item-time">
              {{ item.formatTime.mm }}
            </div>
            <div>分</div>
          </div>
          <div class="clock-list--item_bottom-item">
            <div class="clock-list--item_bottom-item-time">
              {{ item.formatTime.ss }}
            </div>
            <div>秒</div>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import Day from 'dayjs';
import { defineProps, PropType, ref, defineEmits } from 'vue';
interface List {
  key: number;
  title: string;
  audio: string;
  desc: string;
  enable: boolean;
  date: (string | number)[];
  time: string[];
  avatar: string;
  formatTime: any;
}
const props = defineProps({
  list: {
    type: Array as PropType<List[]>,
    default: () => [],
  },
});

const emit = defineEmits(['click']);

const formatTime = (time: string[]) => {
  const nowTime = Date.now();
  const alarmTime = Day(time[0], 'HH:mm:ss').valueOf();
  const diff = alarmTime - nowTime;
  const dd = Math.floor(diff / 1000 / 60 / 60) % 24;
  const hh = Math.floor(diff / 1000 / 60 / 60) % 60;
  const mm = Math.floor(diff / 1000 / 60) % 60;
  const ss = Math.floor(diff / 1000) % 60;
  return {
    dd,
    hh,
    mm,
    ss,
  };
};

const clockList = ref(
  props.list.map((item) => {
    item.formatTime = formatTime(item.time);
    return item;
  })
);

const handleClick = (event: Event, item: any) => {
  emit('click', item);
};
const handleScrollBottom = () => {
  console.log('bottom');
};
</script>

<style lang="scss" scoped>
.clock-list {
  padding: 10px;
  height: 100%;
  box-sizing: border-box;
  overflow-y: auto;
  &::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 2px; /*高宽分别对应横竖滚动条的尺寸*/
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
  }
  &--item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    &_top {
      z-index: 1;
      padding: 10px;
      display: flex;
      align-items: center;
      background-color: #937617;
      border-radius: 10px;
    }
    &_desc {
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
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 20px 0 10px;
      background-color: #f2e7c2;
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
      transform: translateY(-10px);
      &-item {
        padding: 0 8px;
        text-align: center;
        font-size: 12px;
        &-time {
          font-size: 16px;
          font-weight: 600;
        }
      }
    }
  }
}
</style>
