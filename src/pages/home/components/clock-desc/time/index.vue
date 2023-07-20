<template>
  <div class="time-box">
    <el-tag class="time-box__item" v-for="item in props.time" key="item" round :color="color" size="large" closable
      @close="() => handleClose(item)">{{ item }}</el-tag>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
const props = defineProps({
  time: {
    type: Array,
    default: () => []
  },
  color: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['remove'])

const handleClose = (timeStr) => {
  emit('remove', dayjs(timeStr, "HH:mm:ss").valueOf())
}



</script>

<style lang="scss" scoped>
.time-box {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  &__item {
    margin-bottom: 4px;
  }
}
</style>