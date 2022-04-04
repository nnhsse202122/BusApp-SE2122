import {io, Socket} from "socket.io-client"; // Causes an error in broswer but it don't matter

const socket = io('/admin');

type BusData = {
    number: string,
    change: string,
    arrival: string,
    status: string
};

function emitSet(icon: HTMLElement) {
    const row = icon.parentElement!.parentElement!;
    const busData = {} as BusData;
    busData.number = (<HTMLInputElement> row.children[0].children[0]).value;
    busData.change = (<HTMLInputElement> row.children[1].children[0]).value;
    busData.arrival = (<HTMLInputElement> row.children[2].children[0]).value;
    busData.status = (<HTMLInputElement> row.children[3].children[0]).value;
    row.remove();
    sort(busData);
    socket.emit("updateMain", {
        type: "set",
        ...busData
    });
}

function removeBus(icon: HTMLElement) {
    const busNumber = (<HTMLInputElement> icon.parentElement!.parentElement!.children[0].children[0]).value;
    if (confirm(`Are you sure you want to delete bus ${busNumber}?`)) {
        icon.parentElement!.parentElement!.remove();
        socket.emit("updateMain", {
            type: "delete",
            number: busNumber
        });
    }
}

function sort(busData: BusData) {
    const tbody = document.getElementById("tbody")!;
    let i;
    for (i = 1; i < tbody.children.length; i++) {
        if (parseInt(busData.number) < parseInt((<HTMLInputElement> tbody.children[i].children[0].children[0]).value)) break;
    }
    const row = (<HTMLTableElement> document.getElementById("table")).insertRow(i);
    // @ts-ignore
    const html = ejs.render(document.getElementById("getRender").getAttribute("row"), {data: busData});
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

socket.on("updateBuses", (busData) => {
    sort(busData);
});

socket.on("updateWeather", (weatherData) => {

});