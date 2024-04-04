<template>
  <el-card v-bind="$attrs" class="add-card-skeleton" shadow="hover" @click="handleAdd">
    <el-skeleton class="add-card-skeleton__body">
      <template #template>
        <div class="add-card-skeleton__body-wrap">
          <div class="add-card-skeleton__body-wrap--title">
            <el-skeleton-item
              variant="circle"
              style="--el-skeleton-circle-size: 60px; margin: 10px"
            />
            <div style="flex: 1; height: 60px; margin-right: 10px">
              <el-skeleton-item variant="h1" style="width: 30%" />
              <el-skeleton-item variant="text" style="width: 100%" />
              <el-skeleton-item
                variant="text"
                style="width: 60%; transform: translateY(-4px)"
              />
            </div>
          </div>
          <div class="add-card-skeleton__body-wrap--add">
            <div class="button">添加</div>
          </div>
        </div>
      </template>
    </el-skeleton>
  </el-card>
</template>

<script lang="ts" setup>
const emit = defineEmits(["click"]);

const handleAdd = () => {
  emit("click");
};
</script>

<style lang="scss" scoped>
.add-card-skeleton {
  position: sticky;
  bottom: 0;
  z-index: 9999;
  padding: 0 0 8px;
  cursor: pointer;
  &__body {
    &-wrap {
      height: 140px;
      background-color: #fafafa;
      border-radius: 8px;
      &--title {
        display: flex;
        align-items: center;
      }
      &--add {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 60px;
        .button {
          text-align: center;
          line-height: 40px;
          width: 100px;
          height: 40px;
          font-size: 16px;
          color: gray;
          border: 2px solid #fff;
          border-style: dashed;
          border-radius: 12px;
          background-color: #eaecf1;
          transition: all 0.5s;
        }
      }
    }
  }
  &:hover {
    .button {
      text-align: center;
      line-height: 40px;
      width: 100px;
      height: 40px;
      font-size: 16px;
      color: #fff;
      border: 2px solid #fff;
      border-style: dashed;
      border-radius: 12px;
      background-color: #409eff;
    }
  }
}
</style>
