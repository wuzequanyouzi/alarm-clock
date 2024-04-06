// 必须先初始化全局变量
import { preload } from './initConfig';
import { app, BrowserWindow, shell, ipcMain, screen, Menu } from 'electron'
import { release } from 'node:os'
import { join } from 'node:path'
import { saveConfig, getConfig } from '../utils/index';
import { ClockWindow } from './clock-window';

// Disable GPU Acceleration for Windows 7
if (release().startsWith('6.1')) app.disableHardwareAcceleration()

// Set application name for Windows 10+ notifications
if (process.platform === 'win32') app.setAppUserModelId(app.getName())

if (!app.requestSingleInstanceLock()) {
  app.quit()
  process.exit(0)
}

// Remove electron security warnings
// This warning only shows in development mode
// Read more on https://www.electronjs.org/docs/latest/tutorial/security
// process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

let win: BrowserWindow | null = null
let clockWin: ClockWindow = null;
const url = process.env.VITE_DEV_SERVER_URL
const indexHtml = join(process.env.DIST, 'index.html')
let size = null;

async function createWindow() {
  win = new BrowserWindow({
    title: '来电提醒',
    width: 1024,
    height: 768,
    resizable: false,
    icon: join(process.env.VITE_PUBLIC, 'logo.jpg'),
    webPreferences: {
      preload,
      nodeIntegration: true,
      contextIsolation: true,
      // Warning: Enable nodeIntegration and disable contextIsolation is not secure in production
      // nodeIntegration: true,

      // Consider using contextBridge.exposeInMainWorld
      // Read more on https://www.electronjs.org/docs/latest/tutorial/context-isolation
      // contextIsolation: false,
    },
  })
  Menu.setApplicationMenu(null);

  if (process.env.VITE_DEV_SERVER_URL) { // electron-vite-vue#298
    win.loadURL(url)
    // Open devTool if the app is not packaged
    win.webContents.openDevTools()
  } else {
    win.loadFile(indexHtml)
  }

  // Test actively push message to the Electron-Renderer
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', new Date().toLocaleString())
  })

  // Make all links open with the browser, not with the application
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https:')) shell.openExternal(url)
    return { action: 'deny' }
  })
  // win.webContents.on('will-navigate', (event, url) => { }) #344
  
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
})

app.on('window-all-closed', () => {
  win = null
  clockWin = null;
  if (process.platform !== 'darwin') app.quit()
})

app.on('second-instance', () => {
  if (win) {
    // Focus on the main window if the user tried to open another
    if (win.isMinimized()) win.restore()
    win.focus()
  }
})

app.on('activate', () => {
  const allWindows = BrowserWindow.getAllWindows()
  if (allWindows.length) {
    allWindows[0].focus()
  } else {
    createWindow()
  }
})

// New window example arg: new windows url
ipcMain.handle('open-win', (_, arg) => {
  const childWindow = new BrowserWindow({
    webPreferences: {
      preload,
      nodeIntegration: true,
      contextIsolation: false,
    },
  })

  if (process.env.VITE_DEV_SERVER_URL) {
    childWindow.loadURL(`${url}#${arg}`)
  } else {
    childWindow.loadFile(indexHtml, { hash: arg })
  }
})


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
ipcMain.on('try-play', (event, task) => {
  clockWin.play(task);
});

// 接听
ipcMain.on('connect', (event) => {
  clockWin.setCenterPosition();
});
