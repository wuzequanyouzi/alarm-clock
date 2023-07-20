import { app, BrowserWindow, shell, ipcMain, screen } from 'electron';
import { release } from 'os';
import { join } from 'path';
import { ROOT_PATH } from './constants';
import { ClockWindow } from './clock-window';
import { saveConfig, getConfig } from '../utils/index';

// Disable GPU Acceleration for Windows 7
if (release().startsWith('6.1')) app.disableHardwareAcceleration();

// Set application name for Windows 10+ notifications
if (process.platform === 'win32') app.setAppUserModelId(app.getName());

if (!app.requestSingleInstanceLock()) {
  app.quit();
  process.exit(0);
}

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

let win: BrowserWindow | null = null;
let clockWin: ClockWindow = null;
// Here, you can also use other preload
const preload = join(__dirname, '../preload/index.js');
// 🚧 Use ['ENV_NAME'] avoid vite:define plugin
const url = `http://${process.env['VITE_DEV_SERVER_HOST']}:${process.env['VITE_DEV_SERVER_PORT']}`;
const indexHtml = join(ROOT_PATH.dist, 'index.html');

let size = null;

async function createWindow() {
  win = new BrowserWindow({
    title: '来电提醒',
    width: 1024,
    height: 768,
    resizable: false,
    icon: join(ROOT_PATH.public, 'favicon.ico'),
    webPreferences: {
      preload,
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  // win.setMenu(null);

  if (app.isPackaged) {
    win.loadFile(indexHtml);
  } else {
    win.loadURL(url);
    // win.webContents.openDevTools()
  }

  // Test actively push message to the Electron-Renderer
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', new Date().toLocaleString());
  });

  // Make all links open with the browser, not with the application
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https:')) shell.openExternal(url);
    return { action: 'deny' };
  });
  
  const { setting } = getConfig();
  // 读取配置
  ipcMain.on('loadConfig', () => {
    win.webContents.send('setConfig', setting);
  })
}


app.whenReady().then(() => {
  size = screen.getPrimaryDisplay().workAreaSize;
  createWindow();
  clockWin = new ClockWindow(size);
});

app.on('window-all-closed', () => {
  win = null;
  if (process.platform !== 'darwin') app.quit();
});

app.on('second-instance', () => {
  if (win) {
    // Focus on the main window if the user tried to open another
    if (win.isMinimized()) win.restore();
    win.focus();
  }
});

app.on('activate', () => {
  const allWindows = BrowserWindow.getAllWindows();
  if (allWindows.length) {
    allWindows[0].focus();
  } else {
    createWindow();
  }
});

// new window example arg: new windows url
ipcMain.handle('open-win', (event, arg) => {
  const childWindow = new BrowserWindow({
    webPreferences: {
      preload,
    },
  });

  if (app.isPackaged) {
    childWindow.loadFile(indexHtml, { hash: arg });
  } else {
    childWindow.loadURL(`${url}/#${arg}`);
  }
});

// 铃声时间到
ipcMain.on('clock-now', (event, task) => {
  clockWin.play(task);
});

ipcMain.on('audio-end', (event) => {
  clockWin.setCurrentPlayInfo(null);
  clockWin.window?.hide();
  // 关闭闹钟，通知win窗口
  win?.webContents.send('audio-end');
});

// 试听
ipcMain.on('save-config', (event, playInfo) => {
  console.log('save-config')
  // clockWin.play(playInfo);
});

// 接听
ipcMain.on('connect', (event) => {
  clockWin.setCenterPosition();
});
