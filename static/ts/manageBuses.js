"use strict";
function addBus() {
    const table = document.getElementById("table");
    const row = table.insertRow(1);
    const busNumber = row.insertCell(0);
    const busChange = row.insertCell(1);
    const busStatus = row.insertCell(2);
    const deleteBus = row.insertCell(3);
    deleteBus.setAttribute("class", "deleteBus");
    const numberInput = document.createElement("input");
    numberInput.setAttribute("class", "tableInput");
    numberInput.setAttribute("type", "number");
    numberInput.setAttribute("name", "busNumber");
    busNumber.appendChild(numberInput);
    const changeInput = document.createElement("input");
    changeInput.setAttribute("class", "tableInput");
    changeInput.setAttribute("type", "number");
    changeInput.setAttribute("name", "busChange");
    busChange.appendChild(changeInput);
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
function removeBus(icon) {
    icon.parentElement.parentElement.remove();
}
