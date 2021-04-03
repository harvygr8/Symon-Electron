const electron = require('electron');
const path = require('path');
const url = require('url');
const si = require('systeminformation');
const os = require('os')
const osu = require('os-utils')
const nsu = require('node-os-utils');
const cpu=nsu.cpu

const {app, BrowserWindow, Menu, ipcMain} = electron;



// Listen for app to be ready
app.on('ready', () => {

  const mainWindow = new BrowserWindow({
    width:860,
    height:810,
    minWidth:860,
    maxWidth:860,
    minHeight:555,
    maxWidth:795,
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
    cpuInfo.push(cpu.manufacturer,cpu.brand,cpu.cores);
    //cpuInfo.push(cpu['brand']);
    //cpuInfo.push(cpu['cores']);
    mainWindow.webContents.send('CPU_INFO',cpuInfo);
    //console.log(cpuInfo);
  }).catch(error => console.error(error));


  si.osInfo().then(osi=>{
    const osInfo=[];
    osInfo.push(osi.distro,osi.build,osi.hostname);
    mainWindow.webContents.send('OS_INFO',osInfo);
  }).catch(error => console.error(error));


  si.baseboard().then(mb=>{
    const mbInfo=[];
    mbInfo.push(mb.manufacturer,mb.model,mb.version)
    mainWindow.webContents.send('MB_INFO',mbInfo);
  }).catch(error => console.error(error));

  si.graphics().then(gfx=>{
    const gInfo=[];
    gInfo.push(gfx.controllers[0].vendor,gfx.controllers[0].model,gfx.controllers[0].vram)
    //console.log(gfx.controllers[0].model);
    mainWindow.webContents.send('GFX_INFO',gInfo);
  }).catch(error => console.error(error));

setInterval(()=>{
    cpu.usage().then(cstats=>{
      mStats=[]
      var mem=osu.freemem()/1024
      mStats.push(cstats,osu.sysUptime(),mem)
      //console.log( 'UPtime ' + os.sysUptime());
      mainWindow.webContents.send('CPT_INFO',mStats);
  });
},500);


  //const cInfo=[];
  //cInfo.push(cpt)
  //console.log(cpt);
//  mainWindow.webContents.send('CPT_INFO',cInfo);

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
