"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_client_1 = require("socket.io-client"); // Causes an error in broswer but it don't matter
const socket = (0, socket_io_client_1.io)('/admin');
function emitSet(icon) {
    const row = icon.parentElement.parentElement;
    const busData = {};
    busData.number = row.children[0].children[0].value;
    busData.change = row.children[1].children[0].value;
    busData.arrival = row.children[2].children[0].value;
    busData.status = row.children[3].children[0].value;
    row.remove();
    sort(busData);
}
function emitDelete() {
}
function sort(busData) {
    const tbody = document.getElementById("tbody");
    let i;
    for (i = 1; i < tbody.children.length; i++) {
        console.log(tbody);
        console.log(tbody.children[i].children[0].children[0].value);
        if (parseInt(busData.number) < parseInt(tbody.children[i].children[0].children[0].value))
            break;
    }
    const row = document.getElementById("table").insertRow(i);
    // @ts-ignore
    const html = ejs.render(document.getElementById("getRender").getAttribute("row"), { data: busData });
    row.innerHTML = html;
}
// let timeout;
// function onChange() {
//     clearTimeout(timeout);
//     timeout = setTimeout(emit, 4000);
// }
// function emit() {
//     const tableRows = document.getElementById("table").rows;
//     const data = [];
//     for(let i = 1; i < tableRows.length; i++) {
//         data.push({
//             "number": tableRows[i].children[0].children[0].value,
//             "change": tableRows[i].children[1].children[0].value,
//             "arrival": tableRows[i].children[2].children[0].value,
//             "status": tableRows[i].children[3].children[0].value
//         });
//     }
//     socket.emit("updateMain", data);
// }
// socket.on("update", (data) => {
//     const html = ejs.render(document.getElementById("getRender").getAttribute("render"), {data: data});
//     document.getElementById("content").innerHTML = html;
// });
