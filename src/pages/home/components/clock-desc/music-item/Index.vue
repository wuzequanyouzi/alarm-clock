<!--
 * @Author: zequan.wu
 * @Date: 2024-04-05 10:48:48
 * @LastEditors: zequan.wu
 * @LastEditTime: 2024-04-06 13:58:34
 * @FilePath: \alarm-clock\src\pages\home\components\clock-desc\music-item\Index.vue
 * @Description: 
 * 
-->
<template>
  <div class="music-wrap">
    <div>
      <div class="music-name" v-show="currentMusic.path">
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
        :row-class="handleRowClass"
        fixed
      />
    </div>
  </el-drawer>
  <audio ref="audioRef" style="display: none;" :src="currentPlay.path" autoplay/>
</template>

<script lang="tsx" setup>
import { Music } from "../../../../../types/index.d";
import { getNormalMusicList } from '@/config/index';
import { ref, defineProps, defineEmits } from "vue";
import { ElMessage, ElButton } from "element-plus";
const MUSIC_LIST_KEY = '__MUSIC_LIST_KEY__';

const storageMusicList = JSON.parse(localStorage.getItem(MUSIC_LIST_KEY) || '[]');

const __init__ = () => {
  return [...getNormalMusicList(), ...storageMusicList]
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
const emit = defineEmits(['useMusic', 'deleteMusic']);

const audioRef = ref<HTMLAudioElement|null>(null);
const handlePreview = (music: Music) => {
  currentPlay.value = music;
  (audioRef.value as HTMLAudioElement).currentTime = 0;
  audioRef.value?.play();
}
const handleUse = (music: Music) => {
  if (props.currentMusic.path === music.path) {
    return;
  }
  emit('useMusic', music)
}
const handleDelete = (music: Music) => {
  saveMusicFileToList(music, 'delete');
  emit('deleteMusic', music);
}


const handleRowClass = (row: any) => {
  if (row.rowData.path === props.currentMusic.path) {
    return 'current-music';
  }
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
    cellRenderer: ({ rowIndex, rowData }) => (
      <>
        <ElButton class="btn-active" circle onClick={() => handlePreview(rowData)}>
          <i class="iconfont icon-audio"></i>
        </ElButton>
        {
          rowData.path !== props.currentMusic.path &&
          <ElButton class="btn-active" circle onClick={() => handleUse(rowData)}>
            <i class="iconfont icon-select"></i>
          </ElButton>
        }
        {
          rowData.notDelete ?
            null :
            <ElButton class="btn-active" circle onClick={() => handleDelete(rowData)}>
              <i class="iconfont icon-delete" style="color: red;"></i>
            </ElButton> 
        }
      </>
    ),
    width: 150,
    align: 'right'
  },
];

const musicList = ref<Music[]>(__init__());

const saveMusicFileToList = (music: Music, type = 'add') => {
  switch (type) {
    case 'add':
      storageMusicList.push(music);
      musicList.value.push(music);
      break;
    case 'delete':
      const index = storageMusicList.findIndex((item: Music) => item.path === music.path);
      if (index > -1) {
        storageMusicList.splice(index, 1);
      }
      musicList.value.splice(getNormalMusicList().length + index, 1);
      break;
    default:
      break;
  }
  localStorage.setItem(MUSIC_LIST_KEY, JSON.stringify(storageMusicList));
}

const handleSelectFile = (selectFile: any) => {
  const {
    raw: { name, path, type },
  } = selectFile;
  if (!type.startsWith("audio/")) {
    ElMessage.error("请选择音频文件");
  } else {
    if (musicList.value.find(item => item.path === path)) {
      ElMessage.warning("音频文件已在列表中");
    } else {
      saveMusicFileToList({ name, path, type })
    }
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
  .current-music {
    color: green;
  }
}
</style>
