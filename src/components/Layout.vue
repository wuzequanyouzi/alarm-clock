<template>
  <div class="layout">
    <div class="layout--left">
      <el-menu class="menu" :default-active="activeMenuItem">
        <el-menu-item
          v-for="menuItem in menu"
          :key="menuItem.key"
          :index="menuItem.key"
        >
          <div class="menu-item">
            <i class="iconfont" :class="menuItem.icon"></i>
            <span class="label">{{ menuItem.label }}</span>
          </div>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="layout--right">
      <slot name="content"> 123 </slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps } from 'vue';
const props = defineProps({
  menu: {
    type: Object,
    default: () => ({}),
  },
});
const activeMenuItem = ref('0');
</script>

<style lang="scss" scoped>
.layout {
  height: 100vh;
  display: flex;
  &--left {
    width: 80px;
  }
  &--right {
    width: calc(100% - 80px);
    height: 100%;
  }
}

.menu {
  height: 100%;
  :deep .el-menu-item {
    height: auto;
    padding: 0 !important;
  }
  :deep .el-menu-item:hover {
    background-color: #ddd;
  }
}
.menu-item {
  width: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .iconfont {
    line-height: 30px;
    font-size: 30px;
  }
  .label {
    margin-top: 10px;
    line-height: 14px;
    font-size: 14px;
  }
}
</style>
