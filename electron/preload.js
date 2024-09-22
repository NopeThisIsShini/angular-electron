// preload is the bridge between randerer and main process

// const { ipcRenderer } = require("electron");

console.log(process.versions);
// when we want to use node js we need to use this and we want to triggered our app in electron we need to use this
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#btn').addEventListener('click', () => {
        console.log("Hello world !")
      })
})

// preload.js
const { contextBridge, ipcRenderer } = require('electron');


window.addEventListener('DOMContentLoaded', () => {
    const close = document.querySelector('#close');
    const minimize = document.querySelector('#minimize');
    const maximize = document.querySelector('#maximize');

    //send a message to main process for closing the window
    close.addEventListener('click', () => {
        ipcRenderer.invoke('close-app')
    })
    //send a message to main process for minimize the window
    minimize.addEventListener('click', () => {
        ipcRenderer.invoke('minimize')
    })
    //send a key to main process for maximize the window
    maximize.addEventListener('click', () => {
        ipcRenderer.invoke('maximize')
    })

      // Listen to 'window-maximized' event to change the maximize icon
      ipcRenderer.on('window-maximized', () => {
        maximize.innerHTML = '&#x2752;'; // Change to restore icon (e.g., a "restore" icon)
    });

    // Listen to 'window-unmaximized' event to change the maximize icon
    ipcRenderer.on('window-unmaximized', () => {
        maximize.innerHTML = '&#9723;'; // Change back to maximize icon
    });
})