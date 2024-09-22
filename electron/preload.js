// preload is the bridge between randerer and main process

console.log(process.versions);
// when we want to use node js we need to use this and we want to triggered our app in electron we need to use this
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#btn').addEventListener('click', () => {
        console.log("Hello world !")
      })
})