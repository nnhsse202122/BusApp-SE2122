/// <reference path="./socket-io-client.d.ts"/>

const updateBusListSocket = window.io('/updateBusList');

async function getBusList()  {
    let res = await fetch("/busList");
    let busList = await res.json() as number[];
    console.log(busList);

    function test() {
        console.log(busList);
    }
}
getBusList();
