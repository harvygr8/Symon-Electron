const electron=require('electron');
const ipcRenderer=electron.ipcRenderer;

//catching cpustuff
ipcRenderer.on('CPU_INFO',(event,cpu_data) =>{
  console.log(cpu_data);
  document.getElementById('infoValueCPUMN').innerHTML=cpu_data[0];
  document.getElementById('infoValueCPUMO').innerHTML=cpu_data[1];
  document.getElementById('infoValueCores').innerHTML=cpu_data[2];

});

//catching systemdata
ipcRenderer.on('OS_INFO',function(event,os_data){
  //console.log(data);
  document.getElementById('infoValueOS').innerHTML=os_data[0];
  document.getElementById('infoValueOSB').innerHTML=os_data[1];
  document.getElementById('infoValueHN').innerHTML=os_data[2];
});

//catching Motherboardinfo
ipcRenderer.on('MB_INFO',function(event,mb_data){
  //console.log(data);
  document.getElementById('infoValueMAN').innerHTML=mb_data[0];
  document.getElementById('infoValueMOD').innerHTML=mb_data[1];
  document.getElementById('infoValueVER').innerHTML=mb_data[2];
});

//catching GpuInfo
ipcRenderer.on('GFX_INFO',function(event,gfx_data){
  //console.log(data);
  document.getElementById('infoValueGVN').innerHTML=gfx_data[0];
  document.getElementById('infoValueGMD').innerHTML=gfx_data[1];
  document.getElementById('infoValueGRM').innerHTML=gfx_data[2];
});

ipcRenderer.on('CPT_INFO',function(event,c_data){
  //console.log(data);
  document.getElementById('infoValueCPT').innerHTML=c_data[0].toFixed(2);
  document.getElementById('infoValueCPM').innerHTML=c_data[1].toFixed(1);
  document.getElementById('infoValueCPN').innerHTML=c_data[2].toFixed(2);

});
