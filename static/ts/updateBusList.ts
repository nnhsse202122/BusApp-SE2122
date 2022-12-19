// /// <reference path="./socket-io-client.d.ts"/>

// const updateBusListSocket = window.io('/updateBusList');

let busList: string[];
fetch("/busList").then((res) => res.json()).then((data) => {busList = data; console.log(busList)});

let newBusEmptyRow: string;
fetch("/updateBusListEmptyRow").then((res) => res.text()).then((data) => newBusEmptyRow = data);

let newBusRow: string;
fetch("/updateBusListPopulatedRow").then((res) => res.text()).then((data) => newBusRow = data);

function newBus_busList() {
    const row = (<HTMLTableElement> document.getElementsByClassName("buslist-table")[0]).insertRow(2);
    const html = ejs.render(newBusEmptyRow);
    row.innerHTML = html;
    let input = row.children[0]!.children[0] as HTMLInputElement;
    input.focus()
}

function addBus_busList(confirmButton: HTMLElement) {
    let row = confirmButton.parentElement!.parentElement! as HTMLTableRowElement;
    let number = (row.children[0]!.children[0] as HTMLInputElement).value;
    if (busList.includes(number)) {
        alert("Duplicate buses are not allowed");
        return;
    }
    let index = busList.findIndex((currentNumber) => {return parseInt(number) < parseInt(currentNumber)});
    if (index == -1) index = busList.length;
    busList.splice(index, 0, number);
    row.remove();
    const newRow = (<HTMLTableElement> document.getElementsByClassName("buslist-table")[0]).insertRow(index + 2);
    const html = ejs.render(newBusRow, {number: number});
    newRow.innerHTML = html;
}

function removeBus_busList(secondChild: HTMLElement) {
    let row = secondChild.parentElement!.parentElement! as HTMLTableRowElement;
    let number = row.children[0]!.innerHTML;
    busList.splice(busList.indexOf(number), 1);
    row.remove();
}