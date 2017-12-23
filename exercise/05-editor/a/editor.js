const {Menu, dialog} = require('electron').remote
const fs = require('fs')

const template = [
  {
    label: 'File',
    submenu: [
      {
        label: 'Open',
        accelerator: 'CmdOrCtrl+O',
        click: function Open () {
          dialog.showOpenDialog(
            function (fileName) {
              if (fileName === undefined) {
                console.log('No file selected')
                return
              }
              console.log('fileName=' + fileName)

              var filePath = document.getElementById('filePath')
              filePath.innerText = fileName
              fs.readFile(fileName.toString(), 'utf8', function (err, data) {
                if (err) window.alert('read fail!')
                var text = document.getElementById('text')
                text.value = data
              })
            }
          )
        }
      },
      {
        label: 'Save',
        accelerator: 'CmdOrCtrl+S',
        click: function Save () {
          var fileName = document.getElementById('filePath').innerText
          if (fileName.trim().length === 0) window.alert('No file loaded!')
          if (fileName === '未命名') {
            dialog.showSaveDialog(
            function (fileName) {
              if (fileName === undefined) {
                console.log('No file selected')
                return
              }
              fs.writeFile(fileName, document.getElementById('text').value, function (err, data) {
                if (err) {
                  dialog.showMessageBox({message: 'The save is failed!', buttons: ['OK']})
                }
              })
              var filePath = document.getElementById('filePath')
              filePath.innerText = fileName
            }
          )
          }
          var text = document.getElementById('text')
          fs.writeFile(fileName, text.value)
        }
      },
      {
        label: 'Save as',
        accelerator: 'CmdOrCtrl+A',
        click: function SaveAs () {
          dialog.showSaveDialog(
            function (fileName) {
              if (fileName === undefined) {
                console.log('No file selected')
                return
              }
              fs.writeFile(fileName, document.getElementById('text').value, function (err, data) {
                if (err) {
                  dialog.showMessageBox({message: 'The save is failed!', buttons: ['OK']})
                }
              })
              var filePath = document.getElementById('filePath')
              filePath.innerText = fileName
            }
          )
        }
      },
      {
        label: 'Create new file',
        accelerator: 'CmdOrCtrl+C',
        click: function CreateNewFile () {
          var filePath = document.getElementById('filePath')
          filePath.innerText = '未命名'
          var content = document.getElementById('text')
          content.value = null
        }
      },
      { label: 'Exit', role: 'close' }
    ]
  },
  {
    label: 'Edit',
    submenu: [
      { role: 'undo' },
      { role: 'redo' },
      { type: 'separator' },
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' }
    ]
  },
  {
    label: 'View',
    submenu: [
      { role: 'reload' },
      { role: 'toggledevtools' },
      { type: 'separator' },
      { role: 'resetzoom' },
      { role: 'zoomin' },
      { role: 'zoomout' },
      { type: 'separator' },
      { role: 'togglefullscreen' }
    ]
  },
  {
    role: 'window',
    submenu: [
      { role: 'minimize' },
      { role: 'close' }
    ]
  },
  {
    role: 'help',
    submenu: [ { label: 'Learn More' } ]
  }
]

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)
