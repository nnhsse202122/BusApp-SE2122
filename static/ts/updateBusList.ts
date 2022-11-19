/// <reference path="./socket-io-client.d.ts"/>

const updateBusListSocket = window.io('/updateBusList');

let busList: number[];
fetch("/busList").then((res) => res.json()).then((data) => {busList = data; console.log(busList)});
console.log(busList!)
