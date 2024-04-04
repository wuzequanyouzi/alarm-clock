/*
 * @Author: zequan.wu
 * @Date: 2024-04-04 20:55:34
 * @LastEditors: zequan.wu
 * @LastEditTime: 2024-04-04 22:02:08
 * @FilePath: \alarm-clock\src\types\index.d.ts
 * @Description: 
 * 
 */
export interface List {
  key: number;
  title: string;
  audio: string;
  desc: string;
  enable: boolean;
  date: (string | number)[];
  time: string[];
  avatar: string;
  clockTime: number[];
}

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

export interface Clock {
  key: number;
  title: string;
  audio: string;
  desc: string;
  enable: boolean;
  week: boolean[];
  date: (string | number)[];
  time: string[];
  avatar: string;
  clockTime: any;
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