/*
 * @Author: zequan.wu
 * @Date: 2024-04-05 12:45:29
 * @LastEditors: zequan.wu
 * @LastEditTime: 2024-04-06 17:04:27
 * @FilePath: \alarm-clock\src\config\index.ts
 * @Description: 
 * 
 */
import { Clock, Music } from "../types";
import zhangyugeSrc from '../assets/images/zhangyuge.png';
import zhangyugeAudio from '../assets/mp3/zhangyuge.mp3';

export const getNormalMusicList = (): Music[] => [
  {
    name: '章鱼哥',
    path: zhangyugeAudio,
    type: 'audio/mp3',
    notDelete: true,
  },
]

export const getNormalClock = (): Clock => {
  return {
    key: 0,
    title: '下班提醒',
    audio: getNormalMusicList()[0],
    desc: '我要说的是，如果有一天我真的实现了我生命中的梦想...',
    enable: true,
    week: [true, true, true, true, false, false, false], // 下标表示星期
    date: [],
    time: ['21:20:20', '23:33:25'],
    avatar: {
      path: zhangyugeSrc,
      blob: zhangyugeSrc,
      normal: true
    },
    clockTime: new Map()
  }
}

export const getNorMalClockList = (): Clock[] => [
  getNormalClock()
]