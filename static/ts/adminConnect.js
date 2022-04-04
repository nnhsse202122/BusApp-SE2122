"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_client_1 = require("socket.io-client"); // Causes an error in broswer but it don't matter
const socket = (0, socket_io_client_1.io)('/admin');
const timers = new Map();
function getRow(element) {
    return element.parentElement.parentElement;
}
function getBusNumber(element) {
    if (element instanceof HTMLTableRowElement) {
        return parseInt(element.children[0].children[0].value);
    }
    return parseInt(element.parentElement.parentElement.children[0].children[0].value);
}
function addBus() {
    const row = document.getElementById("table").insertRow(1);
    // @ts-ignore
    const html = ejs.render(document.getElementById("getRender").getAttribute("emptyRow"));
    row.innerHTML = html;
    Array.from(document.getElementsByClassName("tableInput")).forEach((input) => {
        // input.addEventListener("blur", forceSet);
    });
    row.children[0].children[0].focus();
}
function setBus(input) {
    const row = getRow(input);
    const busData = {};
    busData.number = `${getBusNumber(row)}`;
    if (!busData.number) {
        alert("Bus number is required");
        startTimeout(input);
        return;
    }
    const tbody = document.getElementById("tbody");
    for (let i = 1; i < tbody.children.length; i++) {
        if (parseInt(busData.number) == getBusNumber(tbody.children[i])) {
            alert("Duplicate bus numbers are not allowed");
            startTimeout(input);
            return;
        }
    }
    busData.change = row.children[1].children[0].value;
    busData.arrival = row.children[2].children[0].value;
    busData.status = row.children[3].children[0].value;
    row.remove();
    sort(busData);
    socket.emit("updateMain", Object.assign({ type: "set" }, busData));
}
function startTimeout(input) {
    const row = getRow(input);
    clearTimeout(timers.get(row));
    timers.set(row, window.setTimeout(() => { setBus(input); }, 3000));
}
// function cancelBus(icon: HTMLElement) {
//     if (confirm("Are you sure you want to cancel bus creation?")) {
//         icon.parentElement!.parentElement!.remove();
//     }
// }
function removeBus(icon) {
    const busNumber = getBusNumber(icon);
    if (confirm(`Are you sure you want to delete bus ${busNumber}?`)) {
        getRow(icon).remove();
        socket.emit("updateMain", {
            type: "delete",
            number: `${busNumber}`
        });
    }
}
function sort(busData) {
    const tbody = document.getElementById("tbody");
    let i;
    for (i = 1; i < tbody.children.length; i++) {
        if (parseInt(busData.number) < getBusNumber(tbody.children[i]))
            break;
    }
    const row = document.getElementById("table").insertRow(i);
    // @ts-ignore
    const html = ejs.render(document.getElementById("getRender").getAttribute("populatedRow"), { data: busData });
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
function statusChange(dropDown) {
    const tr = dropDown.parentElement.parentElement;
    const busArrival = tr.querySelector(`input[name="busArrival"]`);
    if (dropDown.value == "NOT HERE") {
        busArrival.value = "";
    }
    else if (dropDown.value == "HERE") {
        const date = new Date();
        let hour = parseInt(date.toTimeString().substring(0, 3));
        let minute = date.toTimeString().substring(3, 5);
        let effix;
        if (hour > 12) {
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
