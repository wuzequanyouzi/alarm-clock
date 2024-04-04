<!--
 * @Author: zequan.wu
 * @Date: 2024-04-03 16:00:03
 * @LastEditors: zequan.wu
 * @LastEditTime: 2024-04-04 20:56:53
 * @FilePath: \alarm-clock\src\pages\home\components\clock-desc\select-clock-dialog\index.vue
 * @Description: 
 * 
-->
<template>
  <div class="add-time" @click="handleClick">
    <el-icon><CirclePlus /></el-icon>
    <span>添加</span>
  </div>

  <Teleport to="body">
    <div class="mask-box" v-if="isShow">
      <div class="select-modal">
        <div class="title">
          <span>时间设置</span>
          <el-icon class="close-dom" @click="handleClose"><Close /></el-icon>
        </div>
        <div class="modal-body">
          <el-time-picker
            v-model="time"
            placeholder="Arbitrary time"
            :clearable="false"
          />
          <div class="footer" @click="handleSubmit">确定</div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const emit = defineEmits(['submit']);

const isShow = ref(false);
const time = ref(new Date());

const handleClick = () => {
  isShow.value = !isShow.value;
};

const handleClose = () => {
  isShow.value = false;
}

const handleSubmit = () => {
  emit('submit', time.value.getTime());
  handleClose();
};
</script>

<style lang="scss" scoped>
.add-time {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 20px;
  padding: 4px 8px;
  margin-top: 6px;
  width: 56px;
  background-color: #fff;
  cursor: pointer;
  &:hover {
    background-color: #e3e3e3;
    &:deep(.el-icon) {
      color: #fff;
    }
  }
}
.mask-box {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: rgba($color: #f5f5f5, $alpha: .8);
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
}
.select-modal {
  position: relative;
  width: 300px;
  height: 100px;
  padding: 0 10px 10px;
  background-color: #fff;
  border: #e3e3e3 1px solid;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  .title {
    padding: 0 10px;
    font-weight: 600;
  }
  .close-dom {
    position: absolute;
    right: 10px;
    top: 10px;
    cursor: pointer;
  }
}
.modal-body {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
.footer {
  color: #409eff;
  cursor: pointer;
}
</style>
