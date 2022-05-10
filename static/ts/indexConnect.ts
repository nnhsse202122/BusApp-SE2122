/// <reference path="./socket-io-client.d.ts"/>

const indexSocket = window.io('/'); // This line and the line above is how you get ts types to work on clientside... cursed

// Reloads the page every time some clicks back on it after clicking off (eg. going home or going to another tab)
window.addEventListener("focus", () => {
    location.reload();
});

// Rewrites the html for the entire page using the new data and client side ejs
indexSocket.on("update", (data) => {
    // document.getElementById("getRender")!.getAttribute("render")! gets the ejs
    // Syntax id ejs.render(ejsCode, data)
    const html = ejs.render(document.getElementById("getRender")!.getAttribute("render")!, {data: data});
    document.getElementById("content")!.innerHTML = html;
});