/*
 * @Author: zequan.wu
 * @Date: 2024-04-04 20:55:34
 * @LastEditors: zequan.wu
 * @LastEditTime: 2024-04-05 12:23:29
 * @FilePath: \alarm-clock\src\types\index.d.ts
 * @Description: 
 * 
 */
export interface AudioInfo {
  key?: number;
  title?: string;
  audio?: string;
  desc?: string;
  enable?: boolean;
  date?: (string | number)[];
  time?: string[];
  avatar?: string;
  formatTime?: any;
  name?: string;
}

export type Music = {
  path: string,
  name: string,
  type: string
}

export interface Clock {
  key: number | string;
  title: string;
  audio: Music;
  desc: string;
  enable: boolean;
  week: boolean[];
  date: (string | number)[];
  time: string[];
  avatar: string;
  clockTime: any;
  style?: string;
}

export interface Task {
  name: string;
  task: Promise<any>;
  clockInfo: any;
  resolve: () => {};
  reject: () => {};
  time: number;
  taskEnd: any;
}