import { app, BrowserWindow, shell, ipcMain, screen } from 'electron';
import { release } from 'os';
import { join } from 'path';

// Disable GPU Acceleration for Windows 7
if (release().startsWith('6.1')) app.disableHardwareAcceleration();

// Set application name for Windows 10+ notifications
if (process.platform === 'win32') app.setAppUserModelId(app.getName());

if (!app.requestSingleInstanceLock()) {
  app.quit();
  process.exit(0);
}

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

export const ROOT_PATH = {
  // /dist
  dist: join(__dirname, '../..'),
  // /dist or /public
  public: join(__dirname, app.isPackaged ? '../..' : '../../../public'),
};

let win: BrowserWindow | null = null;
let clockWin: BrowserWindow | null = null;
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
}

const createClockWindow = () => {
  clockWin = new BrowserWindow({
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
      preload,
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  // clockWin.setMenu(null);

  if (app.isPackaged) {
    clockWin.loadFile(`${indexHtml}/#about`);
  } else {
    clockWin.loadURL(`${url}/#about`);
    // win.webContents.openDevTools()
  }

  // 播放窗口
  clockWin.on('show', () => {
    console.log('clockWin show');
    clockWin.webContents.send('send-audio', currentTask);
  });
  clockWin.on('hide', () => {
    resetClockWindow();
  });
};

app.whenReady().then(() => {
  size = screen.getPrimaryDisplay().workAreaSize;
  createWindow();
  createClockWindow();
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
    createClockWindow();
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
    // childWindow.webContents.openDevTools({ mode: "undocked", activate: true })
  }
});

const tasks = [];
// 正在闹铃
let status = false;
let currentTask = null;

const fire = (arr) => {
  clockWin?.hide();
  clockWin.setPosition(size.width - 350, size.height - 110);
  currentTask = arr.shift();
  clockWin?.show();
};

// 铃声时间到
ipcMain.on('clock-now', (event, task) => {
  console.log(task);
  tasks.push(task);
  if (!status) {
    status = true;
    fire(tasks);
  }
});

ipcMain.on('audio-end', (event) => {
  status = false;
  if (tasks.length > 0) {
    fire(tasks);
  } else {
    clockWin?.hide();
  }
});

// 试听
ipcMain.on('clock-try', (event, audioInfo) => {
  currentTask = audioInfo;
  clockWin.setPosition(size.width - 350, size.height - 110);
  clockWin?.hide();
  clockWin?.show();
});

// 接听
ipcMain.on('connect', (event) => {
  clockWin.setPosition((size.width - 350) / 2, 100);
  clockWin.setContentSize(350, 660);
});

ipcMain.on('break', (event) => {
  clockWin?.hide();
});

const resetClockWindow = () => {
  clockWin.setContentSize(340, 100);
};
