<template>
  <div class="clock-list-desc">
    <div class="clock-list-desc--left">
      <ClockList v-bind="$attrs" @click="handleClick"/>
    </div>
    <div class="clock-list-desc--right">
      <ClockDesc v-bind="$attrs" :clock-info="currentClockInfo" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import ClockList from './clock-list/index.vue';
import ClockDesc from './clock-desc/index.vue';

const currentClockInfo = ref({});

const handleClick = (item: any) => {
  currentClockInfo.value = item;
};
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
