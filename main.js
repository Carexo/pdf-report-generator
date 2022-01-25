const electron = require("electron");
const path = require("path");
const url = require("url");

const { app, BrowserWindow } = electron;

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

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
