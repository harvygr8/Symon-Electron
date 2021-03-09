const electron = require('electron');
const path = require('path');
const url = require('url');
const si = require('systeminformation');

// SET ENV
process.env.NODE_ENV = 'development';

const {app, BrowserWindow, Menu, ipcMain} = electron;



// Listen for app to be ready
app.on('ready', () => {

  const mainWindow = new BrowserWindow({
    width:383,
    height:700,
    webPreferences:{
      nodeIntegration:true
    }
  });

  //load HTML
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes:true
  }));

  //Dev tools
  //mainWindow.webContents.openDevTools()

  //SI functions+sending data to renderer

  si.cpu().then(cpu=>{
    //console.log(cpu['manufacturer']);
    const cpuInfo=[];
    cpuInfo.push(cpu['manufacturer']);
    cpuInfo.push(cpu['brand']);
    cpuInfo.push(cpu['cores']);
    mainWindow.webContents.send('CPU_INFO',cpuInfo);
    //console.log(cpuInfo);
  }).catch(error => console.error(error));


  si.osInfo().then(osi=>{
    const osInfo=[];
    osInfo.push(osi['distro']);
    osInfo.push(osi['build']);
    osInfo.push(osi['hostname']);
    mainWindow.webContents.send('OS_INFO',osInfo);
  }).catch(error => console.error(error));


  si.baseboard().then(mb=>{
    const mbInfo=[];
    mbInfo.push(mb['manufacturer'])
    mbInfo.push(mb['model']);
    mbInfo.push(mb['version']);
    mainWindow.webContents.send('MB_INFO',mbInfo);
  });


  // Quit app when closed
  mainWindow.on('closed', () => {
    app.quit();
  });

  // Build menu from template and replace original
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  Menu.setApplicationMenu(mainMenu);
});


const mainMenuTemplate =  [
  // Each object is a dropdown
  {
    label: 'File',
    submenu:[
      {
        label: 'Quit',
        accelerator:process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
        click(){
          app.quit();
        }
      }
    ]
  }
];
