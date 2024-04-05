<!--
 * @Author: zequan.wu
 * @Date: 2024-04-04 20:55:34
 * @LastEditors: zequan.wu
 * @LastEditTime: 2024-04-05 11:03:26
 * @FilePath: \alarm-clock\src\components\Block.vue
 * @Description: 
 * 
-->
<template>
  <div class="block">
    <div class="block-left">
      <slot name="icon">
        <i class="iconfont" :style="{ fontSize: `${props.size}px` }" :class="icon"></i>
      </slot>
    </div>
    <div class="block-right">
      <p class="label">{{ props.label }}</p>
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  label: {
    type: String,
    default: ""
  },
  icon: {
    type: String,
    default: ""
  },
  size: {
    type: Number,
    default: 30
  }
})
</script>

<style lang="scss" scoped>
.block {
  margin-bottom: 10px;
  display: flex;

  &-left {
    padding: 10px;
    width: 32px;
    text-align: center;
    .iconfont {
      font-size: 30px;
    }
  }

  &-right {
    padding-top: 10px;
    .label {
      height: 30px;
      line-height: 26px;
    }
  }
}</style>