<template>
  <div class="input-label" @dblclick="handleInputClick">
    <span class="input-label__content" v-show="props.label && !inputting">{{ props.label }}</span>
    <el-input
      ref="inputRef"
      v-show="inputting || !props.label"
      v-model="modelValue"
      style="width: 100%"
      :placeholder="props.placeholder"
      @blur="handleBlur"
    />
  </div>
</template>

<script lang="ts" setup>
import { defineProps, ref, watchEffect, defineEmits, nextTick } from "vue";

const props = defineProps({
  label: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "",
  },
});
const emit = defineEmits(['change']);

const modelValue = ref(props.label);
const inputting = ref(false);
const inputRef = ref<HTMLInputElement | null>(null)

watchEffect(() => {
  modelValue.value = props.label;
  inputting.value = false;
})

const handleInputClick = () => {
  inputting.value = true;
  nextTick(() => {
    inputRef.value?.focus();
  })
};
const handleBlur = () => {
  inputting.value = false;
  emit('change', modelValue.value);
}

</script>

<style lang="scss" scoped>
.input-label {
  &__content {
    min-width: 60px;
    height: 21px;
    user-select: none;
    cursor: pointer;
  }
}
</style>
