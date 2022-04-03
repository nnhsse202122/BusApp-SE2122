const socket = io('/admin');

function emitSet() {

}

function emitDelete() {

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
