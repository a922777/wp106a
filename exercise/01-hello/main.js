// const electron = require('electron')
// const app = electron.app
// const BrowserWindow = electron.BrowserWindow
const {app, BrowserWindow} = require('electron')
// 傳回app, BrowserWindow欄位
function createWindow () {
  var win = new BrowserWindow({width: 800, height: 600})
  win.loadURL('file://' + __dirname + '/index.html')
// win.loadURL()決定視窗呼叫的頁面
}

app.on('ready', createWindow)
// 等app.on 狀態是ready時，才呼叫Window
