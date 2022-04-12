"use strict";
/// <reference path="./socket-io-client.d.ts"/>
const adminSocket = window.io('/admin'); // This line and the line above is how you get ts types to work on clientside... cursed
class Bus {
    constructor(rowVal) {
        this.row = rowVal;
        this.numberInput = this.row.children[0].children[0];
        this.changeInput = this.row.children[1].children[0];
        this.statusInput = this.row.children[2].children[0];
        this.arrivalInput = this.row.children[3].children[0];
        this.removeIcon = this.row.children[4].children[0];
        this.data = {};
        this.updateValues();
    }
    updateValues() {
        this.number = this.numberInput.value;
        this.data.number = this.numberInput.value;
        this.data.change = this.changeInput.value;
        this.data.arrival = this.arrivalInput.value;
        this.data.status = this.statusInput.value;
    }
}
const buses = []; /// TODO: Add buses already in the table
{
    const table = document.getElementById("table");
    const rows = [...table.rows];
    rows.splice(0, 1);
    rows.forEach((row) => {
        buses.push(new Bus(row));
    });
}
function getBus(key, attribute) {
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
function printBuses() {
    buses.forEach((bus) => { console.log(bus.data.number); });
}
function newBus() {
    const row = document.getElementById("table").insertRow(1);
    const html = ejs.render(document.getElementById("getRender").getAttribute("emptyRow"));
    row.innerHTML = html;
    const bus = new Bus(row);
    buses.splice(0, 0, bus);
    bus.numberInput.focus();
    // printBuses();
}
function startTimeout(input, type) {
    const bus = getBus(input);
    bus.updateValues();
    clearTimeout(bus.timer);
    const func = (type == "add") ? addBus : updateBus;
    bus.timer = window.setTimeout(() => { func(input); }, 3000);
}
function addBus(input) {
    const bus = getBus(input);
    if (!bus.data.number) {
        alert("Bus number is required");
        return;
    }
    for (let otherBus of buses) {
        if (bus != otherBus && bus.data.number == otherBus.data.number) {
            alert("Duplicate bus numbers are not allowed");
            return;
        }
    }
    bus.row.remove();
    buses.splice(buses.indexOf(bus), 1);
    sort(bus.data);
    adminSocket.emit("updateMain", {
        type: "add",
        data: bus.data
    });
    // console.log("emitted add");
}
function updateBus(input) {
    const bus = getBus(input);
    adminSocket.emit("updateMain", {
        type: "update",
        data: bus.data
    });
    // console.log("emitted update");
}
function cancelBus(icon) {
    const bus = getBus(icon, "removeIcon");
    removeBus(bus);
}
function confirmRemove(icon) {
    const bus = getBus(icon, "removeIcon");
    if (confirm(`Are you sure you want to delete bus ${bus.data.number}?`)) {
        removeBus(bus);
        adminSocket.emit("updateMain", {
            type: "delete",
            data: {
                number: bus.data.number
            }
        });
        // console.log("emitted delete");
        // printBuses();
    }
}
function removeBus(bus) {
    clearTimeout(bus.timer);
    bus.row.remove();
    buses.splice(buses.indexOf(bus), 1);
}
function sort(bus) {
    const busAfter = buses.find((otherBus) => {
        return parseInt(bus.number) < parseInt(otherBus.data.number);
    });
    let index;
    if (busAfter) {
        index = buses.indexOf(busAfter);
    }
    else {
        index = buses.length;
    }
    const row = document.getElementById("table").insertRow(index + 1);
    const html = ejs.render(document.getElementById("getRender").getAttribute("populatedRow"), { data: bus });
    row.innerHTML = html;
    buses.splice(index, 0, new Bus(row));
    // printBuses();
}
function statusChange(dropDown) {
    const bus = getBus(dropDown, "statusInput");
    if (bus.statusInput.value == "NOT HERE") {
        bus.arrivalInput.value = "";
    }
    else {
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
adminSocket.on("updateBuses", (command) => {
    let bus;
    switch (command.type) {
        case "add":
            sort(command.data);
            break;
        case "update":
            bus = getBus(command.data.number, "number");
            const html = ejs.render(document.getElementById("getRender").getAttribute("populatedRow"), { data: command.data });
            bus.row.innerHTML = html;
            buses[buses.indexOf(bus)] = new Bus(bus.row);
            break;
        case "delete":
            bus = getBus(command.data.number, "number");
            removeBus(bus);
            break;
        default:
            throw `Invalid bus command: ${command.type}`;
    }
});
adminSocket.on("updateWeather", (weather) => {
    const html = ejs.render(document.getElementById("getRender").getAttribute("weather"), { weather: weather });
    document.getElementById("weather").innerHTML = html;
});
