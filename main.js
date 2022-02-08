const electron = require("electron");
const path = require("path");
const url = require("url");

const { app, BrowserWindow, Menu } = electron;

const electronRemote = require("@electron/remote/main");
electronRemote.initialize();

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  electronRemote.enable(mainWindow.webContents);

  Menu.setApplicationMenu(Menu.buildFromTemplate([]));

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "/src/mainWindow.html"),
      protocol: "file:",
      slashes: true,
    })
  );
};

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
