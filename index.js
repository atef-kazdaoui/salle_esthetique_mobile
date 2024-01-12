const {app, BrowserWindow, ipcMain} = require ('electron');

let mainWindow;

function createWindow () {
  mainWindow = new BrowserWindow ({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  mainWindow.loadURL (`file://${app.getAppPath ()}/public/index.html`);
  // Écoutez l'événement de redirection envoyé depuis le rendu
  ipcMain.on ('redirect', (event, path) => {
    mainWindow.loadURL (`file://${app.getAppPath ()}/public/${path}`);
  });

  mainWindow.on ('closed', function () {
    mainWindow = null;
  });
}

app.on ('ready', createWindow);

app.on ('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit ();
  }
});

app.on ('activate', function () {
  if (mainWindow === null) {
    createWindow ();
  }
});
