<!--
 * @Author: zequan.wu
 * @Date: 2024-04-04 20:55:34
 * @LastEditors: zequan.wu
 * @LastEditTime: 2024-04-06 19:55:21
 * @FilePath: \alarm-clock\src\pages\home\components\clock-desc\week-checkbox\index.vue
 * @Description: 
 * 
-->
<template>
  <div>
    <el-checkbox-group :model-value="checkList" @change="handleChange" size="large">
      <el-checkbox-button v-for="(label, index) in weekSetting" :key="index" :value="label">
        {{ label }}
      </el-checkbox-button>
    </el-checkbox-group>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue';
const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const weekSetting = ref([
  '周日',
  '周一',
  '周二',
  '周三',
  '周四',
  '周五',
  '周六',
]);
const checkList = ref<string[]>([]);

watchEffect(() => {
  if (props.modelValue) {
    checkList.value = [];
    props.modelValue.forEach((item, index) => {
      if (item) {
        checkList.value.push(weekSetting.value[index]);
      }
    })
  }
})

// TODO: 用v-model 可能会带来BUG，点击星期设置，没进行保存，由于clockList的week已经变化，当闹钟结束，会触发重新计算时间，导致数据不对。
const handleChange = (checks) => {
  const checksFormat = Array(7).fill(false);
  checks.forEach((check) => {
    const findIndex = weekSetting.value.findIndex((item) => item === check);
    checksFormat[findIndex] = true;
  })
  emit('update:modelValue', checksFormat);
}
</script>

<style lang="scss" scoped></style>