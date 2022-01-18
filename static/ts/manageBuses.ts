function addBus() {
    const table = <HTMLTableElement> document.getElementById("table");
    const row = table.insertRow(1);
    const busNumber = row.insertCell(0);
    const busStatus = row.insertCell(1);
    const deleteBus = row.insertCell(2);
    deleteBus.setAttribute("class", "deleteBus");

    const numberInput = document.createElement("input");
    numberInput.setAttribute("class", "tableInput");
    numberInput.setAttribute("type", "number");
    numberInput.setAttribute("name", "busNumber");
    busNumber.appendChild(numberInput);
    
    const statusSelect = document.createElement("select");
    statusSelect.setAttribute("name", "busStatus");
    ["NOT HERE", "HERE", "LOADING", "GONE"].forEach((status) => {
        const option = document.createElement("option");
        option.innerHTML = status;
        statusSelect.appendChild(option);
    });
    busStatus.appendChild(statusSelect);

    const deleteIcon = document.createElement("i");
    deleteIcon.setAttribute("class", "fas fa-times");
    deleteIcon.setAttribute("onclick", "removeBus(this)");
    deleteBus.appendChild(deleteIcon);
}

function removeBus(icon: HTMLElement) {
    (<HTMLTableElement> (<HTMLElement>icon.parentElement).parentElement).remove();
}
