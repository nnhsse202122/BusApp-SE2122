"use strict";
/// <reference path="./socket-io-client.d.ts"/>
const socket = window.io('/admin');
class BusRow {
    constructor(rowVal) {
        this.row = rowVal;
        this.numberInput = this.row.children[0].children[0];
        this.changeInput = this.row.children[1].children[0];
        this.arrivalInput = this.row.children[2].children[0];
        this.statusInput = this.row.children[3].children[0];
        this.removeIcon = this.row.children[4].children[0];
        this.updateValues();
    }
    updateValues() {
        this.number = this.numberInput.value;
        this.change = this.changeInput.value;
        this.arrival = this.arrivalInput.value;
        this.status = this.statusInput.value;
    }
}
const buses = []; /// TODO: Add buses already in the table
{
    const table = document.getElementById("table");
    const rows = [...table.rows];
    rows.splice(0, 1);
    rows.forEach((row) => {
        buses.push(new BusRow(row));
    });
}
function getBusRow(key, attribute) {
    if (!attribute) {
        attribute = [...key.classList].find((htmlClass) => {
            return ["numberInput", "changeInput", "arrivalInput", "statusInput"].includes(htmlClass);
        });
    }
    const bus = buses.find((bus) => { return bus[attribute] == key; });
    if (bus)
        return bus;
    throw "Bus not found";
}
function addBus() {
    const row = document.getElementById("table").insertRow(1);
    // @ts-ignore
    const html = ejs.render(document.getElementById("getRender").getAttribute("emptyRow"));
    row.innerHTML = html;
    const bus = new BusRow(row);
    buses.splice(0, 0, bus);
    bus.numberInput.focus();
}
function startTimeout(input) {
    const bus = getBusRow(input);
    bus.updateValues();
    clearTimeout(bus.timer);
    bus.timer = window.setTimeout(() => { setBus(input); }, 3000);
    console.log(`Timer started for ${input}`);
}
function setBus(input) {
    console.log(`started set bus for ${input}`);
    const bus = getBusRow(input);
    if (!bus.number) {
        alert("Bus number is required");
        return;
    }
    for (let otherBus of buses) {
        // console.log(bus, otherBus);
        if (bus != otherBus && bus.number == otherBus.number) {
            alert("Duplicate bus numbers are not allowed");
            return;
        }
    }
    console.log(`cleared verification for ${input}`);
    bus.row.remove();
    sort(bus);
    console.log(`sorted for ${input}`);
    socket.emit("updateMain", {
        type: "set",
        number: bus.number,
        change: bus.change,
        arrival: bus.arrival,
        status: bus.status
    });
    console.log(`emitted for ${input}`);
}
function removeBus(icon) {
    const bus = getBusRow(icon, "removeIcon");
    if (bus.number) {
        if (confirm(`Are you sure you want to delete bus ${bus.number}?`)) {
            clearTimeout(bus.timer);
            bus.row.remove();
            socket.emit("updateMain", {
                type: "delete",
                number: bus.number
            });
        }
        buses.splice(buses.indexOf(bus), 1);
        return;
    }
    clearTimeout(bus.timer);
    bus.row.remove();
    buses.splice(buses.indexOf(bus), 1);
}
function sort(bus) {
    const busAfter = buses.find((otherBus) => {
        // console.log(bus.number, otherBus.number);
        // console.log(parseInt(bus.number!) > parseInt(otherBus.number!));
        return parseInt(bus.number) < parseInt(otherBus.number);
    });
    let index;
    if (busAfter) {
        console.log(busAfter.number);
        index = buses.indexOf(busAfter);
    }
    else {
        console.log(2);
        index = buses.length;
    }
    const row = document.getElementById("table").insertRow(index);
    // @ts-ignore
    const html = ejs.render(document.getElementById("getRender").getAttribute("populatedRow"), {
        data: {
            number: bus.number,
            change: bus.change,
            arrival: bus.arrival,
            status: bus.status
        }
    });
    row.innerHTML = html;
}
function statusChange(dropDown) {
    const bus = getBusRow(dropDown, "statusInput");
    if (bus.statusInput.value == "NOT HERE") {
        bus.arrivalInput.value = "";
    }
    else if (bus.statusInput.value == "HERE") {
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
        bus.arrivalInput.value = `${hour}:${minute}${effix}`;
    }
}
socket.on("updateBuses", (busData) => {
    sort(busData);
});
socket.on("updateWeather", (weatherData) => {
});
