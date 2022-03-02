const socket = io('/');

socket.on("update", (data) => {
    const table = document.getElementById("busTable");
    table.innerHTML = "";
    const firstRow = table.insertRow(0);
    firstRow.insertCell().innerHTML = "Bus Number";
    firstRow.insertCell().innerHTML = "Bus Change";
    firstRow.insertCell().innerHTML = "Bus Arrived";
    firstRow.insertCell().innerHTML = "Status";

    const buses = data.buses;
    for (const bus of buses) {
        const row = table.insertRow();
        row.insertCell().innerHTML = bus.number;
        row.insertCell().innerHTML = bus.change;
        row.insertCell().innerHTML = bus.arrival;
        row.insertCell().innerHTML = bus.status;
    }
});
