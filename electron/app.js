const { app, BrowserWindow, ipcMain } = require('electron')
const url = require("url");
const path = require("path");
const windowStateKeeper = require('electron-window-state');

let mainWindow

function createWindow() {

  // Load the previous state with fallback to defaults
  let mainWindowState = windowStateKeeper({
    defaultWidth: 1000,
    defaultHeight: 800
  });
  mainWindow = new BrowserWindow({
    frame: false,
    // width: 800,
    // height: 600,
    // we can define axis where window open on screen
    // x: 0,
    // y: 0, 

    //set min-height and min-width
    minWidth: 500,
    minHeight: 400,
    // for app icon 
    icon: path.join(app.getAppPath(), "src","assets", "icon6.png"),
    // transparent:true,

    // no defining the axix and height width manually we control it from electron-state-keeper
    x: mainWindowState.x,
    y: mainWindowState.y,
    width: mainWindowState.width,
    height: mainWindowState.height,
    // custom title 
    title: "This is Custom state with nodemon and eectron with state keeper",
    webPreferences: {
      // we can't use this two line as this is not secure, like if i open a google website in app load it would easily run a node js code and access my backend 
      // if we active this two dependancy any one can easily access our backend and system
      // nodeIntegration: true,
      // contextIsolation: false,
      // instead of using this we use  preload 
      preload: path.join(__dirname, "preload.js")
    }
    // webPreferences: {
    //   nodeIntegration: true,
    //   contextIsolation: false,
    //   webSecurity: false, // Disable web security temporarily (be careful with this)
    //   enableRemoteModule: true,  // Enable remote module if you're using it
    // },
    // autoHideMenuBar: true // This hides the menu bar by default
  })


  //load the dist url which is output 
  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, `../dist/angular-electron/browser/index.html`),
      protocol: "file:",
      slashes: true
    })
  );
  // Open the DevTools.
    mainWindow.webContents.openDevTools()

    // In your existing createWindow function
mainWindow.on('maximize', () => {
  mainWindow.webContents.send('window-maximized');
});

mainWindow.on('unmaximize', () => {
  mainWindow.webContents.send('window-unmaximized');
});




  // Let us register listeners on the window, so we can update the state
  // automatically (the listeners will be removed when the window is closed)
  // and restore the maximized or full screen 
  // remember this should give in end of the createWindow function
  mainWindowState.manage(mainWindow);

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}
// this says when app ready call the createWindow function 
// app.on('ready', createWindow)
// or 
app.whenReady().then(() => {
  createWindow();
  //this telling that close the app after 3 seconds 
  // setTimeout(() => {
  //     app.quit();
  // }, 3000);
})

// event listner
app.on('window-all-closed', () => {
  // darwin means mac os if !macbook
  if (process.platform !== 'darwin') app.quit()
})

// for mac it tells that when app is activated call the createWindow function
app.on('activate', function () {
  if (mainWindow === null) createWindow()
})

// custom close triggerd
ipcMain.handle('close-app', () => {
  app.quit()
})
// window minimize triggerd
ipcMain.handle('minimize', () => {
  mainWindow.minimize()
})
// window maximize triggerd
ipcMain.handle('maximize', () => {
  if (mainWindow.isMaximized()) {
    mainWindow.unmaximize()
  } else {
    mainWindow.maximize()
  }
})




