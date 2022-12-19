"use strict";
// /// <reference path="./socket-io-client.d.ts"/>
// const updateBusListSocket = window.io('/updateBusList');
// class Bus_busList {
//     row: HTMLTableRowElement;
//     removeIcon: HTMLElement;
//     number: string | undefined;
//     constructor(rowVal: HTMLTableRowElement) {
//         this.row = rowVal;      
//         this.removeIcon = <HTMLElement> this.row.children[4].children[0];
//         this.data = {} as BusData;
//     }
// }
let busList;
fetch("/busList").then((res) => res.json()).then((data) => { busList = data; console.log(busList); });
let newBusEmptyRow;
fetch("/updateBusListEmptyRow").then((res) => res.text()).then((data) => newBusEmptyRow = data);
function newBus_busList() {
    const row = document.getElementsByClassName("buslist-table")[0].insertRow(2);
    const html = ejs.render(newBusEmptyRow);
    row.innerHTML = html;
    row.children[0].children[0].focus();
}
function removeBus_busList(removeIcon) {
    let row = removeIcon.parentElement.parentElement;
    let number = row.children[0].innerHTML;
    busList.splice(busList.indexOf(number), 1);
    row.remove();
}
//# sourceMappingURL=updateBusList.js.map