<template>
  <div></div>
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

<script lang="ts" setup></script>

<style lang="scss" scoped></style>
