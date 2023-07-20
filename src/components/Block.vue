<template>
  <div class="block">
    <div class="block-left">
      <slot name="icon">
        <i class="iconfont" :class="icon"></i>
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
})
</script>

<style lang="scss" scoped>
.block {
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
}</style>