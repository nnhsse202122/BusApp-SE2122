/// <reference path="./socket-io-client.d.ts"/>

const socket = window.io('/admin');

class Bus {
    row: HTMLTableRowElement;
    numberInput: HTMLInputElement;
    changeInput: HTMLInputElement;
    arrivalInput: HTMLInputElement;
    statusInput: HTMLInputElement;
    removeIcon: HTMLElement;
    number: string | undefined;
    change: string | undefined;
    arrival: string | undefined;
    status: string | undefined;
    timer: number | undefined;

    constructor(rowVal: HTMLTableRowElement) {
        this.row = rowVal;
        this.numberInput = <HTMLInputElement> this.row.children[0].children[0];
        this.changeInput = <HTMLInputElement> this.row.children[1].children[0];
        this.arrivalInput = <HTMLInputElement> this.row.children[2].children[0];
        this.statusInput = <HTMLInputElement> this.row.children[3].children[0];
        this.removeIcon = <HTMLElement> this.row.children[4].children[0];
        this.updateValues();
    }

    updateValues() {
        this.number = this.numberInput.value;
        this.change = this.changeInput.value;
        this.arrival = this.arrivalInput.value;
        this.status = this.statusInput.value;
    }
}

type BusData = {
    number: string,
    change: string,
    arrival: string,
    status: string
}

const buses: Bus[] = []; /// TODO: Add buses already in the table

{
    const table = <HTMLTableElement> document.getElementById("table");
    const rows = [...table.rows];
    rows.splice(0, 1);
    rows.forEach((row) => {
        buses.push(new Bus(row));
    });
}

type validAttribute = Exclude<keyof Bus, "change" | "arrival" | "status" | "timer">

function getBus(key: HTMLElement, attribute: validAttribute): Bus;
function getBus(key: HTMLInputElement): Bus;
function getBus(key: HTMLElement, attribute?: validAttribute) {
    if (!attribute) {
        attribute = (<string[]> [...key.classList]).find((htmlClass) => {
            return ["numberInput", "changeInput", "arrivalInput", "statusInput"].includes(htmlClass)
        }) as validAttribute;
    }
    const bus = buses.find((bus) => {console.log(bus[attribute!]); return bus[attribute!] == key});
    if (bus) return bus;
    throw "Bus not found";  
}

function printBuses() {
    buses.forEach((bus) => {console.log(bus.number)});
}

function newBus() {
    const row = (<HTMLTableElement> document.getElementById("table")).insertRow(1);
    // @ts-ignore
    const html = ejs.render(document.getElementById("getRender").getAttribute("emptyRow"));
    row.innerHTML = html;
    const bus = new Bus(row);
    buses.splice(0, 0, bus);
    bus.numberInput.focus();
    printBuses();
}

function startTimeout(input: HTMLInputElement, type: string) {
    const bus = getBus(input);
    bus.updateValues();
    clearTimeout(bus.timer);
    const func = (type == "add") ? addBus : updateBus;
    bus.timer = window.setTimeout(() => {func(input)}, 3000);
    console.log(`Timer started for ${input}`);
}

function addBus(input: HTMLInputElement) {
    console.log(`started set bus for ${input}`);
    const bus = getBus(input);
    
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
    bus.row.remove();
    buses.splice(buses.indexOf(bus), 1);
    sort({
        number: bus.number,
        change: bus.change,
        arrival: bus.arrival,
        status: bus.status
    });
    socket.emit("updateMain", {
        type: "add",
        number: bus.number,
        change: bus.change,
        arrival: bus.arrival,
        status: bus.status
    });
    console.log(`emitted for ${input}`);
}

function updateBus(input: HTMLInputElement) {
    const bus = getBus(input);
    socket.emit("updateMain", {
        type: "update",
        number: bus.number,
        change: bus.change,
        arrival: bus.arrival,
        status: bus.status
    });
}

function cancelBus(icon: HTMLElement) {
    const bus = getBus(icon, "removeIcon");
    clearTimeout(bus.timer);
    bus.row.remove();
    buses.splice(buses.indexOf(bus), 1);
}

function removeBus(icon: HTMLElement) {
    const bus = getBus(icon, "removeIcon");
    if (confirm(`Are you sure you want to delete bus ${bus.number}?`)) {
        clearTimeout(bus.timer);
        buses.splice(buses.indexOf(bus), 1);
        bus.row.remove();
        socket.emit("updateMain", {
            type: "delete",
            number: bus.number
        });
        printBuses();
    } 
}

function sort(bus: BusData) {
    const busAfter = buses.find((otherBus) => {
        return parseInt(bus.number!) < parseInt(otherBus.number!);
    });
    let index: number;
    if (busAfter) {
        index = buses.indexOf(busAfter);
    }
    else {
        index = buses.length;
    }
    const row = (<HTMLTableElement> document.getElementById("table")).insertRow(index + 1);
    // @ts-ignore
    const html = ejs.render(document.getElementById("getRender").getAttribute("populatedRow"), {
        data: {
            number: bus.number,
            change: bus.change,
            arrival: bus.arrival,
            status: bus.status
    }});
    row.innerHTML = html;
    buses.splice(index, 0, new Bus(row));
    printBuses();
}

function statusChange(dropDown: HTMLSelectElement) {
    const bus = getBus(dropDown, "statusInput");
    if (bus.statusInput.value == "NOT HERE") {
        bus.arrivalInput.value = "";
    }
    else if (bus.statusInput.value == "HERE") {
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
        bus.arrivalInput.value = `${hour}:${minute}${effix}`;    
    }
}

socket.on("updateBuses", (busData) => {
    sort(busData);
});

socket.on("updateWeather", (weatherData) => {

});