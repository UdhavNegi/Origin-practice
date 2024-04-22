const {app, BrowserWindow} = require('electron')
const path = require('path')

function createWindow()
{
    const win = new BrowserWindow({
        width : 1000, 
        height : 700, 
        autoHideMenuBar : true,
        webPreferences : {
            contextIsolation : true,
            nodeIntegration : true,
            // preload : path.join(__dirname, 'preload.js')
        }, 
    })
    win.loadFile('./blocksbuddy-gui-2.0/build/index.html')
}

app.whenReady().then(createWindow)