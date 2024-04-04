<template>
  <div class="clock-list-desc">
    <div class="clock-list-desc--left">
      <ClockList v-bind="$attrs" :currentKey="currentKey" @click="handleClick"/>
    </div>
    <div class="clock-list-desc--right">
      <ClockDesc v-bind="$attrs" :clock-info="currentClockInfo" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { List, Clock } from '../../../types/index';
import { ref, watch, useAttrs } from 'vue';
import ClockList from './clock-list/index.vue';
import ClockDesc from './clock-desc/index.vue';

const currentClockInfo = ref({});
const currentKey = ref(0);
const attrs = useAttrs();

const handleClick = (item: any) => {
  currentClockInfo.value = item;
};

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
