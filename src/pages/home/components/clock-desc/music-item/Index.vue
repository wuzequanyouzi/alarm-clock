<!--
 * @Author: zequan.wu
 * @Date: 2024-04-05 10:48:48
 * @LastEditors: zequan.wu
 * @LastEditTime: 2024-04-05 14:13:26
 * @FilePath: \alarm-clock\src\pages\home\components\clock-desc\music-item\Index.vue
 * @Description: 
 * 
-->
<template>
  <div class="music-wrap">
    <div>
      <div class="music-name" v-show="currentMusic">
        <i class="iconfont icon-music-item"></i><span >{{ currentMusic.name }}</span>
      </div>
      <el-button class="open-drawer__btn" round @click="showDrawer = true">
        <i class="iconfont icon-music-open"></i>
      </el-button>
    </div>
  </div>
  <el-drawer
    v-model="showDrawer"
    size="50%"
    class="my-music-list"
    title="我的铃声"
    direction="rtl"
    @close="handleCloseDrawer"
  >
    <div class="music-list-warp">
      <el-upload
        :show-file-list="false"
        :auto-upload="false"
        accept="audio/*"
        @change="handleSelectFile"
      >
        <el-button
          class="open-drawer__btn"
          style="background-color: #e2e5e9"
          round
          @click="showDrawer = true"
        >
          <i class="iconfont icon-add-music"></i>
        </el-button>
      </el-upload>
      
      <el-table-v2
        :columns="columns"
        :data="musicList"
        class="music-list"
        :width="460"
        :height="520"
        fixed
      />
    </div>
  </el-drawer>
  <audio ref="audioRef" style="display: none;" :src="currentPlay.path" autoplay/>
</template>

<script lang="tsx" setup>
import { Music } from "../../../../../types/index.d";
import { getNormalMusicList } from '@/config/index';
import { ref, defineProps } from "vue";
import { ElMessage, ElButton } from "element-plus";
const MUSIC_LIST_KEY = '__MUSIC_LIST_KEY__';

const __init__ = () => {
  return [...getNormalMusicList(), ...(JSON.parse(localStorage.getItem(MUSIC_LIST_KEY) || '[]'))]
}

const props = defineProps({
  currentMusic: {
    type: [Object as () => Music],
    default: () => ({
      name: "",
      path: "",
      type: "",
    }),
  },
});

const audioRef = ref<HTMLAudioElement|null>(null);
const handlePreview = (music: Music) => {
  currentPlay.value = music;
  (audioRef.value as HTMLAudioElement).currentTime = 0;
  audioRef.value?.play();
}

const showDrawer = ref(false);
const file = ref(null);
const currentPlay = ref({ path: '' })
const columns = [
  {
    key: 'column-n-1',
    width: 50,
    title: 'No.',
    cellRenderer: ({ rowIndex }) => `${rowIndex + 1}`,
    align: 'center',
  },
  {
    key: 'name',
    title: '标题',
    dataKey: 'name',
    width: 150,
  },
  {
    key: 'type',
    title: '类型',
    dataKey: 'type',
    width: 100,
  },
  {
    key: 'options',
    title: '操作',
    cellRenderer: ({ rowIndex, rowData }) => (<ElButton circle onClick={() => handlePreview(rowData)}><i class="iconfont icon-audio"></i></ElButton>),
    width: 150,
    align: 'right'
  },
];

const musicList = ref<Music[]>(__init__());

const handleSelectFile = (selectFile: any) => {
  const {
    raw: { name, path, type },
  } = selectFile;
  if (!type.startsWith("audio/")) {
    ElMessage.error("请选择音频文件");
  } else {
    console.log(selectFile);
  }
};

const handleCloseDrawer = () => {
  currentPlay.value = { path: '' };
  audioRef.value?.pause();
  showDrawer.value = false;
}

</script>

<style lang="scss" scoped>
.open-drawer__btn {
  width: 46px;
  &:active {
    transform: scale(0.9);
  }
}
.music-wrap {
  .icon-music-open {
    font-size: 30px;
  }
  .music-name {
    display: inline-block;
    padding: 0 12px 0 0;
    font-size: 14px;
    color: #777;
  }
  .music-list {
    width: 100%;
  }
}
.icon-add-music {
  font-size: 30px;
}
</style>
<style>
.my-music-list {
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;
  .el-drawer__header {
    margin-bottom: 0;
    padding-bottom: 10px;
  }
}
</style>
