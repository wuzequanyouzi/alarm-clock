/*
 * @Author: zequan.wu
 * @Date: 2024-04-05 12:45:29
 * @LastEditors: zequan.wu
 * @LastEditTime: 2024-04-06 19:27:36
 * @FilePath: \alarm-clock\src\config\index.ts
 * @Description: 
 * 
 */
import { Clock, Music } from "../types";
import zhangyugeSrc from '../assets/images/zhangyuge.png';
import zhangyugeAudio from '../assets/mp3/zhangyuge.mp3';
import workLongSrc from '../assets/images/workLong.png';
import workLongAudio from '../assets/mp3/长命功夫长命做.aac';

export const getNormalMusicList = (): Music[] => [
  {
    name: '章鱼哥',
    path: zhangyugeAudio,
    type: 'audio/mp3',
    notDelete: true,
  },
  {
    name: '长命功夫长命做',
    path: workLongAudio,
    type: 'audio/acc',
    notDelete: true,
  },
]

export const getNorMalClockList = (): Clock[] => {
  const audioList = getNormalMusicList();
  const normalClockList = [
    {
      key: 0,
      title: '下班提醒',
      audio: audioList[0],
      desc: '我要说的是，如果有一天我真的实现了我生命中的梦想...',
      enable: true,
      week: [true, true, true, true, false, false, false], // 下标表示星期
      date: [],
      time: ['18:30:00', '12:00:00'],
      avatar: {
        path: zhangyugeSrc,
        blob: zhangyugeSrc,
        normal: true
      },
      clockTime: new Map()
    },
    {
      key: 1,
      title: '长命功夫长命做',
      audio: audioList[1],
      desc: '长命功夫长命做,今日唔做听日做喽...',
      enable: true,
      week: [true, true, true, true, true, false, false], // 下标表示星期
      date: [],
      time: ['15:00:00'],
      avatar: {
        path: workLongSrc,
        blob: workLongSrc,
        normal: true
      },
      clockTime: new Map()
    }
  ]
  return normalClockList;
}