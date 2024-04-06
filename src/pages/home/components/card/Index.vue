<!--
 * @Author: zequan.wu
 * @Date: 2024-04-06 14:27:18
 * @LastEditors: zequan.wu
 * @LastEditTime: 2024-04-06 20:07:36
 * @FilePath: \alarm-clock\src\pages\home\components\card\Index.vue
 * @Description: 
 * 
-->
<template>
  <div style="position: relative;">
    <div class="card-wrap">
      <div class="left">
        <el-upload
          class="card-wrap__upload"
          :show-file-list="false"
          :auto-upload="false"
          accept="image/*"
          @change="handleSelectFile"
        >
          <img v-if="currentUrl" :src="currentUrl.blob || normalImg" class="avatar" />
          <div class="normal-avatar" v-else>
            <el-icon class="avatar-uploader-icon"><Plus /></el-icon>
          </div>
        </el-upload>
      </div>
      <div class="right">
        <InputLabel
          class="title"
          :label="props.clockInfo.title"
          placeholder="请输入闹钟名称"
          @change="(value) => handleChange(value, 'title')"
        />
        <InputLabel
          class="desc"
          :label="props.clockInfo.desc"
          placeholder="请输入描述"
          @change="(value) => handleChange(value, 'desc')"
        />
      </div>
    </div>
    <div class="option">
      <el-color-picker class="option-color-picker" size="small" :modelValue="props.clockInfo.style?.backgroundColor" @change="handleChangeColor" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Avatar, Clock } from "../../../../types/index";
import { ref, watch, defineModel, defineProps, defineEmits } from "vue";
import { getUrlByFile } from "../../../../utils/handleFile";
import InputLabel from "../input-label/Index.vue";
import normalImg from '../../../../assets/images/normalImg.png';

const props = defineProps({
  clockInfo: {
    type: Object as () => Clock,
    default: () => {},
  },
});

const emit = defineEmits(["updateInfo"]);

const avatar = defineModel<Avatar>("avatar");

const currentUrl = ref(avatar);

const handleSelectFile = (file: any) => {
  currentUrl.value = {
    path: file.raw.path,
    blob: "",
  };
};

const handleChange = (value: string|object, key: string) => {
  emit("updateInfo", key, value);
};
const handleChangeColor = (value: string) => {
  const style = { ...(props.clockInfo.style || {}) };
  style.backgroundColor = value;
  handleChange(style, 'style')
}

watch(currentUrl, (newVal, oldVal) => {
  if (newVal && !newVal?.blob && newVal?.path) {
    getUrlByFile(newVal?.path as string)
      .then((url: string) => {
        (currentUrl.value as Avatar).blob = url;
        avatar.value = {
          ...currentUrl.value,
        } as Avatar;
      })
      .catch((err: Error) => {
        console.error(err);
      });
  }
  // TODO: 暂时不释放资源
  // if (oldVal.blob?.startsWith('blob:')) {
  //   URL.revokeObjectURL(oldVal);
  // }
});
</script>

<style lang="scss" scoped>
.card-wrap {
  z-index: 1;
  position: relative;
  display: flex;
  align-items: center;
  width: 300px;
  height: 100px;
  padding: 12px;
  box-sizing: border-box;
  border-radius: 12px;
  background-color: #ccc;
  &__upload {
    width: 50px;
    height: 50px;
  }
  .left {
    width: 50px;
    height: 50px;
    overflow: hidden;
    border-radius: 50%;
    .avatar {
      width: 50px;
      height: 50px;
      object-fit: cover;
    }
    .normal-avatar {
      width: 50px;
      height: 50px;
      box-sizing: border-box;
      border-radius: 50%;
      border: 1px solid #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      border-style: dashed;
    }
  }
  .right {
    padding-left: 10px;
    width: 216px;
    flex: 1;
    .title {
      font-size: 16px;
      margin-bottom: 4px;
    }
    .desc {
      height: 32px;
      font-size: 12px;
      color: #fff;
    }
  }
}
.card-wrap:hover + .option, .option:hover {
  transform: translateX(-6px);
}
.option {
  position: absolute;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  width: 50px;
  padding: 10px 0 20px 10px;
  height: 100px;
  background-color: #aaa;
  z-index: 0;
  top: 0;
  left: 98%;
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;
  transform: translateX(-100%);
  transition: all 0.3s;
}
</style>
