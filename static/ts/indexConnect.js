const socket = io('/');

socket.on("update", (data) => {
    const html = ejs.render(document.getElementById("getRender").getAttribute("render"), {data: data});
    document.getElementById("content").innerHTML = html;
});
const registerWorker = async ()=>{
    if('serviceWorker' in navigator){
        const registration =  await navigator.serviceWorker.register('/sw/sw.js')
        
    }
    
}