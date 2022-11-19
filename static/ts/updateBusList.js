"use strict";
/// <reference path="./socket-io-client.d.ts"/>
const updateBusListSocket = window.io('/updateBusList');
let busList;
fetch("/busList").then((res) => res.json()).then((data) => { busList = data; console.log(busList); });
console.log(busList);
//# sourceMappingURL=updateBusList.js.map