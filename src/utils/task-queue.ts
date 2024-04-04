const { ipcRenderer } = window;
import { Task } from '../types/index';
export default class ClockQueue {
  tasks: Task[];
  working: boolean = false;
  currentTask: Task | null | undefined = null;
  timer: any = null;
  constructor() {
    this.tasks = [];
    this.__init_event__();
  }

  __init_event__() {
    ipcRenderer.on('audio-end', () => {
      this.timer && clearTimeout(this.timer);
      this.addSleepTask();
      this.currentTask?.reject();
    })
  }

  addTask(name: string, clockInfo: any, time: number = 60000, taskEnd?: () => void, option?: string) {
    // 防止短时间内两个相同的任务进入队列
    if (this.tasks.some(task => task?.name === name )) return;
    let _resolve: any = null;
    let _reject: any = null;
    const task = new Promise((resolve, reject) => {
      _resolve = resolve;
      _reject = reject;
    })
    const taskInfo = {
      name,
      task,
      clockInfo,
      resolve: _resolve,
      reject: _reject,
      time,
      taskEnd
    }
    if (option !== 'push') {
      this.tasks.unshift(taskInfo);
    } else {
      this.tasks.push(taskInfo)
    }
  }

  // 执行任务
  execute() {
    // TODO: 唤起闹钟
    this.sendStartClock();
    this.timer = setTimeout(() => {
      this.currentTask?.reject()
      this.sendCloseClock();
    }, this.currentTask?.time)
  }

  stopCurrentTask() {
    this.currentTask?.reject();
    this.sendCloseClock();
  }

  // 通知打开闹钟
  sendStartClock() {
    this.currentTask?.clockInfo && ipcRenderer.send('clock-now', JSON.stringify(this.currentTask?.clockInfo));
  }

  // 通知关闭闹钟
  sendCloseClock() {
    this.currentTask?.clockInfo && ipcRenderer.send('audio-end');
  }

  // 时延
  addSleepTask(time: number = 5000) {
    this.addTask('时延', null, time, () => { }, 'unshift');
  }

  start() {
    // 没任务，结束
    if (!this.tasks.length) {
      this.working = false;
      return;
    }
    // 在工作，结束
    if (this.working) return;

    this.working = true;
    const taskInfo = this.currentTask = this.tasks.shift();
    taskInfo?.task.then(() => {
      // TODO: 考虑将铃声和内容声音分开，then之后插入内容声音
    }).catch(() => {
    }).finally(() => {
      this.working = false;
      taskInfo?.taskEnd?.();
      this.start();
    });

    this.execute();
  }
}

export const clockQueue = new ClockQueue();