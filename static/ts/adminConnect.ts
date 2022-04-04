import {io, Socket} from "socket.io-client"; // Causes an error in broswer but it don't matter

const socket = io('/admin');

type BusData = {
    number: string,
    change: string,
    arrival: string,
    status: string
};

const timers: Map<HTMLTableRowElement, number> = new Map();

function getRow(element: Element) {
    return <HTMLTableRowElement> element.parentElement!.parentElement!;
}

function getBusNumber(element: Element) {
    if (element instanceof HTMLTableRowElement) {
        return parseInt((<HTMLInputElement> element.children[0].children[0]).value);
    }
    return parseInt((<HTMLInputElement> element.parentElement!.parentElement!.children[0].children[0]).value);
}

function addBus() {
    const row = (<HTMLTableElement> document.getElementById("table")).insertRow(1);
    // @ts-ignore
    const html = ejs.render(document.getElementById("getRender").getAttribute("emptyRow"));
    row.innerHTML = html;
    (<HTMLInputElement[]> Array.from(document.getElementsByClassName("tableInput"))).forEach((input: HTMLInputElement) => {
        // input.addEventListener("blur", forceSet);
    });
    (<HTMLInputElement> row.children[0].children[0]).focus();
}

function setBus(input: HTMLInputElement) {
    const row = getRow(input);
    const busData = {} as BusData;
    busData.number = `${getBusNumber(row)}`;
    if (!busData.number) {
        alert("Bus number is required");
        startTimeout(input);
        return;
    }
    const tbody = document.getElementById("tbody")!;
    for (let i = 1; i < tbody.children.length; i++) {
        if (parseInt(busData.number) == getBusNumber(tbody.children[i])) {
            alert("Duplicate bus numbers are not allowed");
            startTimeout(input);
            return;
        }
    }
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

function startTimeout(input: HTMLInputElement) {
    const row = getRow(input);
    clearTimeout(timers.get(row));
    timers.set(row, window.setTimeout(() => {setBus(input)}, 3000));
}

// function cancelBus(icon: HTMLElement) {
//     if (confirm("Are you sure you want to cancel bus creation?")) {
//         icon.parentElement!.parentElement!.remove();
//     }
// }

function removeBus(icon: HTMLElement) {
    const busNumber = getBusNumber(icon);
    if (confirm(`Are you sure you want to delete bus ${busNumber}?`)) {
        getRow(icon).remove();
        socket.emit("updateMain", {
            type: "delete",
            number: `${busNumber}`
        });
    }
}

function sort(busData: BusData) {
    const tbody = document.getElementById("tbody")!;
    let i;
    for (i = 1; i < tbody.children.length; i++) {
        if (parseInt(busData.number) < getBusNumber(tbody.children[i])) break;
    }
    const row = (<HTMLTableElement> document.getElementById("table")).insertRow(i);
    // @ts-ignore
    const html = ejs.render(document.getElementById("getRender").getAttribute("populatedRow"), {data: busData});
    row.innerHTML = html;
}

// function forceSet(event: FocusEvent) {
//     // console.log(document.activeElement);
//     // console.log(document.activeElement!.parentElement!.parentElement!);
//     // console.log(event.relatedTarg.parentElement!.parentElement!);
//     // console.log(event);
//     // console.log(event.target);
//     // console.log(document.activeElement);
//     if (!event.relatedTarget) {
//         console.log(2);
//         (<HTMLElement> event.target).blur();
//         alert("Save your changes before leaving row");
//         (<HTMLInputElement> event.target).focus();
        
//     }
//     else if ((<HTMLInputElement> event.relatedTarget).parentElement!.parentElement! != (<HTMLInputElement> event.target).parentElement!.parentElement!) {
//         console.log(3);
//         (<HTMLElement> event.target).blur();
//         alert("Save your changes before leaving row");
//         (<HTMLInputElement> event.target).focus();
//     }
// }

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