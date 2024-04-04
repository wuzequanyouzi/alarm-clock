<template>
  <div class="clock-list">
    <el-card class="box-card" v-for="item in props.list" :shadow="current === item.key ? 'always' : 'hover'"
      @click="(event: Event) => handleClick(event, item)">
      <div class="clock-list--item">
        <div class="clock-list--item_top">
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
          <div class="clock-list--item_bottom" v-if="item.enable">
            <CountDown style="transform: translateY(-10px);" v-bind="$attrs" :clock="item" />
          </div>
        </Transition>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import CountDown from "../countdown/index.vue";
import Day from "dayjs";
import { defineProps, PropType, ref, defineEmits } from "vue";
interface List {
  key: number;
  title: string;
  audio: string;
  desc: string;
  enable: boolean;
  date: (string | number)[];
  time: string[];
  avatar: string;
  clockTime: number[];
}
const props = defineProps({
  list: {
    type: Array as PropType<List[]>,
    default: () => [],
  },
  currentKey: {
    type: Number,
    default: 1
  }
});

const emit = defineEmits(["click"]);

const current = ref(props.currentKey);

const handleClick = (event: Event, item: any) => {
  current.value = item.key;
  emit("click", item);
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

  :v-deep {
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
    }

    .enable-enter-active {
      animation: bounce-in 0.5s;
    }

    .enable-leave-active {
      animation: bounce-in 0.5s reverse;
    }

    @keyframes bounce-in {
      0% {
        transform: translateY(-100%);
      }

      100% {
        transform: translateY(0px);
      }
    }
  }
}
</style>
