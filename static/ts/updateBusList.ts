/// <reference path="./socket-io-client.d.ts"/>

const updateBusListSocket = window.io('/updateBusList');

let busList: number[];
fetch("/busList").then((res) => res.json()).then((data) => {busList = data; console.log(busList)});
// console.log(busList!)

let newBusEmptyRow: string;
fetch("/updateBusListEmptyRow").then((res) => res.json()).then((data) => newBusEmptyRow = data);

function newBus() {
    document.getElementsByClassName("buslist-table")
}