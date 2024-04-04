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

interface AudioInfo {
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

interface Clock {
  key: number;
  title: string;
  audio: string;
  desc: string;
  enable: boolean;
  week: boolean[];
  time: string[];
  avatar: string;
  clockTime: any;
}

interface Task {
  name: string;
  task: Promise<any>;
  clockInfo: any;
  resolve: () => {};
  reject: () => {};
  time: number;
  taskEnd: any;
}