// Adds a new bus to the admin table
function addBus() {
    const table = <HTMLTableElement> document.getElementById("table");
    // Adds table row and cells
    const row = table.insertRow(1);
    const busNumber = row.insertCell(0);
    const busChange = row.insertCell(1);
    const busArrival = row.insertCell(2);
    const busStatus = row.insertCell(3);
    const saveBus = row.insertCell(4);
    saveBus.setAttribute("class", "saveBus");
    const deleteBus = row.insertCell(5);
    deleteBus.setAttribute("class", "deleteBus");

    // Creates input element for bus number and adds it to the first cell
    const numberInput = document.createElement("input");
    numberInput.setAttribute("class", "tableInput");
    numberInput.setAttribute("type", "number");
    numberInput.setAttribute("name", "busNumber");
    numberInput.setAttribute("required", "");
    numberInput.setAttribute('oninput','onChange()');
    busNumber.appendChild(numberInput);

    // Creates input element for bus change and adds it to the second cell
    const changeInput = document.createElement("input");
    changeInput.setAttribute("class", "tableInput");
    changeInput.setAttribute("type", "number");
    changeInput.setAttribute("name", "busChange");
    changeInput.setAttribute('oninput','onChange()');
    busChange.appendChild(changeInput);
    
    // Creates input element for bus arrival and adds it to the third cell
    const arrivalInput = document.createElement("input");
    arrivalInput.setAttribute("class", "tableInput");
    arrivalInput.setAttribute("type", "text");
    arrivalInput.setAttribute("name", "busArrival");
    arrivalInput.setAttribute('oninput','onChange()');
    busArrival.appendChild(arrivalInput);
    
    // Creates select element for bus status and adds it to the forth cell
    const statusSelect = document.createElement("select");
    statusSelect.setAttribute("name", "busStatus");
    ["NOT HERE", "HERE", "LOADING", "GONE"].forEach((status) => {
        const option = document.createElement("option");
        option.innerHTML = status;
        statusSelect.appendChild(option);
    });
    statusSelect.setAttribute("onchange", "statusChange(this);onChange()");
    busStatus.appendChild(statusSelect);

    // Creates save button and adds it to the fifth cell
    const saveIcon = document.createElement("i");
    saveIcon.setAttribute("class", "fa-solid fa-check");
    saveIcon.setAttribute("onclick", "emitSet(this)"); //////////////////////// Dont forget
    saveBus.appendChild(saveIcon);

    // Creates delete button and adds it to the sixth cell
    const deleteIcon = document.createElement("i");
    deleteIcon.setAttribute("class", "fas fa-times");
    deleteIcon.setAttribute("onclick", "removeBus(this);onChange()");
    deleteBus.appendChild(deleteIcon);
}

// Deletes a bus from the admin table
function removeBus(icon: HTMLElement) {
    (<HTMLTableElement> (<HTMLElement> icon.parentElement).parentElement).remove();
}

function statusChange(dropDown: HTMLSelectElement) {
    const tr = <HTMLTableElement> (<HTMLElement> dropDown.parentElement).parentElement;
    const busArrival = <HTMLInputElement> tr.querySelector(`input[name="busArrival"]`);
    if (dropDown.value == "NOT HERE") {
        busArrival.value = "";
    }
    else if (dropDown.value == "HERE") {
        const date = new Date();
        let hour = parseInt(date.toTimeString().substring(0, 3));
        let minute = date.toTimeString().substring(3, 5);
        let effix: string;
        if (hour > 12)  {
            hour -= 12;
            effix = "pm";
        }    
        else {
            effix = "am";
        }
        busArrival.value = `${hour}:${minute}${effix}`;    
    }
}