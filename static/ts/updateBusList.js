"use strict";
// /// <reference path="./socket-io-client.d.ts"/>
// const updateBusListSocket = window.io('/updateBusList');
let busList;
fetch("/busList").then((res) => res.json()).then((data) => { busList = data; console.log(busList); });
let newBusEmptyRow;
fetch("/updateBusListEmptyRow").then((res) => res.text()).then((data) => newBusEmptyRow = data);
let newBusRow;
fetch("/updateBusListPopulatedRow").then((res) => res.text()).then((data) => newBusRow = data);
function newBus_busList() {
    const row = document.getElementsByClassName("buslist-table")[0].insertRow(2);
    const html = ejs.render(newBusEmptyRow);
    row.innerHTML = html;
    let input = row.children[0].children[0];
    input.focus();
}
function addBus_busList(confirmButton) {
    let row = confirmButton.parentElement.parentElement;
    let number = row.children[0].children[0].value;
    if (busList.includes(number)) {
        alert("Duplicate buses are not allowed");
        return;
    }
    let index = busList.findIndex((currentNumber) => { return parseInt(number) < parseInt(currentNumber); });
    if (index == -1)
        index = busList.length;
    busList.splice(index, 0, number);
    row.remove();
    const newRow = document.getElementsByClassName("buslist-table")[0].insertRow(index + 2);
    const html = ejs.render(newBusRow, { number: number });
    newRow.innerHTML = html;
}
function removeBus_busList(secondChild) {
    let row = secondChild.parentElement.parentElement;
    let number = row.children[0].innerHTML;
    busList.splice(busList.indexOf(number), 1);
    row.remove();
}
//# sourceMappingURL=updateBusList.js.map