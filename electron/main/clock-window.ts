import { app, BrowserWindow, shell, ipcMain, screen } from 'electron';
import { join } from 'path';
import { ROOT_PATH } from './constants';

const url = `http://${process.env['VITE_DEV_SERVER_HOST']}:${process.env['VITE_DEV_SERVER_PORT']}`;
const indexHtml = join(ROOT_PATH.dist, 'index.html');

export class ClockWindow {
  window: BrowserWindow | null = null;
  currentPlayInfo = null;
  size = null;
  constructor(size) {
    this.__init__(size);
    this.__init_event__();
  }

  __init__(size) {
    this.size = size;
    this.window = new BrowserWindow({
      width: 340,
      height: 100,
      x: size.width - 350,
      y: size.height - 110,
      resizable: false,
      frame: false,
      show: false,
      alwaysOnTop: true,
      focusable: false, // 不可聚焦
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
      },
    });

    if (app.isPackaged) {
      this.window.loadFile(`${indexHtml}/#about`);
    } else {
      this.window.loadURL(`${url}/#about`);
      // win.webContents.openDevTools()
    }
  }

  __init_event__() {
    // 播放窗口
    this.window.on('hide', () => {
      this.resetClockWindow();
    });
  }

  resetClockWindow() {
    this.window.setContentSize(340, 100);
  }

  setCurrentPlayInfo(currentPlayInfo) {
    this.currentPlayInfo = currentPlayInfo;
  }

  sendAudioPlay() {
    this.window.webContents.send('send-audio', this.currentPlayInfo);
  }

  play(info) {
    this.window.setPosition(this.size.width - 350, this.size.height - 110);
    setTimeout(() => {
      this.setCurrentPlayInfo(info)
      this.sendAudioPlay();
      this.window.show();
    }, 0)
  }

  // 居中
  setCenterPosition() {
    this.window.setPosition((this.size.width - 350) / 2, 100);
    this.window.setContentSize(350, 660);
  }
}