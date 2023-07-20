<template>
  <div class="add-time" @click="handleClick">
    <el-icon><CirclePlus /></el-icon>
    <span>添加</span>
  </div>

  <Teleport to="body">
    <div v-if="isShow" class="select-modal">
      <el-time-picker
        v-model="time"
        placeholder="Arbitrary time"
        :clearable="false"
      />
      <div class="footer" @click="handleSubmit">确定</div>
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
const handleSubmit = () => {
  emit('submit', time.value.getTime());
  isShow.value = false;
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
.select-modal {
  position: fixed;
  z-index: 999;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  height: 200px;
  background-color: #fff;
  border: #e3e3e3 1px solid;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
}
.footer {
  color: #409eff;
  cursor: pointer;
}
</style>
