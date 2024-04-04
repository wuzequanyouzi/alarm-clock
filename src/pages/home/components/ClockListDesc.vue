<!--
 * @Author: zequan.wu
 * @Date: 2024-04-04 20:55:34
 * @LastEditors: zequan.wu
 * @LastEditTime: 2024-04-04 22:18:23
 * @FilePath: \alarm-clock\src\pages\home\components\ClockListDesc.vue
 * @Description: 
 * 
-->
<template>
  <div class="clock-list-desc">
    <div class="clock-list-desc--left">
      <ClockList v-bind="$attrs" :currentKey="currentKey" @click="handleClick" @add="handleAdd"/>
    </div>
    <div class="clock-list-desc--right">
      <ClockDesc v-bind="$attrs" :clock-info="currentClockInfo" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { List, Clock } from '../../../types/index';
import { ref, watch, useAttrs } from 'vue';
import ClockList from './clock-list/Index.vue';
import ClockDesc from './clock-desc/index.vue';

const currentClockInfo = ref({});
const currentKey = ref(0);
const attrs = useAttrs();

const handleClick = (item: any) => {
  currentClockInfo.value = item;
};

const handleAdd = (clockInfo: Clock) => {
  currentClockInfo.value = clockInfo;
}

watch((attrs.list as List[]), (newVal: List[]) => {
  if (newVal?.[0]) {
    currentClockInfo.value = newVal[0];
    currentKey.value = (currentClockInfo.value as Clock).key;
  }
}, {
  once: true,
  immediate: true,
  deep: true
})

</script>

<style lang="scss" scoped>
.clock-list-desc {
  padding: 10px;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  display: flex;
  &--left {
    width: 320px;
  }
  &--right {
    width: calc(100% - 320px);
  }
}
</style>
