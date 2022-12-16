// /// <reference path="./socket-io-client.d.ts"/>

// const updateBusListSocket = window.io('/updateBusList');

let busList: number[];
fetch("/busList").then((res) => res.json()).then((data) => {busList = data; console.log(busList)});
// console.log(busList!)

let newBusEmptyRow: string;
fetch("/updateBusListEmptyRow").then((res) => res.text()).then((data) => newBusEmptyRow = data);

function newBus_busList() {
    const row = (<HTMLTableElement> document.getElementsByClassName("buslist-table")[0]).insertRow(2);
    const html = ejs.render(newBusEmptyRow);
    row.innerHTML = html;
}