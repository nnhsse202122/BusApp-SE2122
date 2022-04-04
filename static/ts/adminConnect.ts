import {io, Socket} from "socket.io-client"; // Causes an error in broswer but it don't matter

const socket = io('/admin');

type BusData = {
    number: string,
    change: string,
    arrival: string,
    status: string
};

function addBus() {
    const row = (<HTMLTableElement> document.getElementById("table")).insertRow(1);
    // @ts-ignore
    const html = ejs.render(document.getElementById("getRender").getAttribute("emptyRow"));
    row.innerHTML = html;
    (<HTMLInputElement> row.children[0].children[0]).focus()
}

function setBus(icon: HTMLElement) {
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
    const html = ejs.render(document.getElementById("getRender").getAttribute("populatedRow"), {data: busData});
    row.innerHTML = html;
}

function statusChange(dropDown: HTMLSelectElement) {
    const tr = <HTMLTableElement> (<HTMLElement> dropDown.parentElement).parentElement;
    const busArrival = <HTMLInputElement> tr.querySelector(`input[name="busArrival"]`);
    if (dropDown.value == "NOT HERE") {
        busArrival.value = "";
    }
    else if (dropDown.value == "HERE") {
        const date = new Date();
        let hour = parseInt(date.toTimeString().substring(0, 3));
        let minute = date.toTimeString().substring(3, 5);
        let effix: string;
        if (hour > 12)  {
            hour -= 12;
            effix = "pm";
        }    
        else {
            effix = "am";
        }
        busArrival.value = `${hour}:${minute}${effix}`;    
    }
}

socket.on("updateBuses", (busData) => {
    sort(busData);
});

socket.on("updateWeather", (weatherData) => {

});