
const socket = io('/admin');

function pullData(){
    let tableRows = document.getElementById('table').rows;
    data = {}
    for(var i = 1; i < tableRows.length; i++){
        let busData = {}
        busData['number'] = tableRows[i].children[0].children[0].value
        busData['change'] = tableRows[i].children[1].children[0].value
        busData['arrival'] = tableRows[i].children[2].children[0].value
        busData['status'] = tableRows[i].children[3].children[0].value
        data[i.toString()] = busData;
    }
    return data;
}

function updateStudents(){
    socket.emit('updateMain', pullData());
}

function parseBuses(data){
    document.getElementById('table').innerHTML="";
    let busList = data.buses;
    let firstRow = document.createElement('tr');
    let numHeader = document.createElement('th');
    numHeader.innerHTML = 'Bus Number';
    firstRow.appendChild(numHeader);
    let changeHeader = document.createElement('th');
    changeHeader.innerHTML = 'Bus Change';
    firstRow.appendChild(changeHeader)
    let arrivedHeader = document.createElement('th');
    arrivedHeader.innerHTML = 'Bus Arrived';
    firstRow.appendChild(arrivedHeader)
    let statusHeader = document.createElement('th');
    statusHeader.innerHTML = 'Status';
    firstRow.appendChild(statusHeader)
    let delHeader = document.createElement('th');
    delHeader.classList.add('deleteBus');
    firstRow.appendChild(delHeader)
    document.getElementById('table').appendChild(firstRow);
    for(const b of busList){
        row = document.createElement('tr');
        row.id = 'bus_'+b.number;
        let numberTd = document.createElement('td');
        let numberInput = document.createElement('input');
        numberInput.classList.add('tableInput');
        numberInput.type = 'number';
        numberInput.name = 'busNumber';
        numberInput.value = b.number;
        numberInput.required = true;
        numberInput.oninput = 'updateStudents();';
        numberTd.appendChild(numberInput);
        row.appendChild(numberTd)

        let changeTd = document.createElement('td');
        let changeInput = document.createElement('input');
        changeInput.classList.add('tableInput');
        changeInput.type = 'number';
        changeInput.name = 'busChange';
        changeInput.value = b.change;
        changeInput.oninput = 'updateStudents();';
        changeTd.appendChild(changeInput);
        row.appendChild(changeTd);

        let arrivalTd = document.createElement('td');
        let arrivalInput = document.createElement('input');
        arrivalInput.classList.add('tableInput');
        arrivalInput.type = 'text';
        arrivalInput.name = 'busArrival';
        arrivalInput.value = b.arrival;
        arrivalInput.required = true;
        arrivalInput.oninput = 'updateStudents();';
        arrivalTd.appendChild(arrivalInput);
        row.appendChild(arrivalTd)

        let statusTd = document.createElement('td');
        let statusSelect = document.createElement('select');
        for(const s of ['NOT HERE','HERE',"LOADING",'GONE']){
            let newOption = document.createElement('option');
            newOption.innerHTML = s;
            newOption.value = s;
            statusSelect.appendChild(newOption);
        }
        statusSelect.value = b.status;
        statusSelect.onchange = 'statusChange(this);updateStudents()';
        statusTd.appendChild(statusSelect);
        row.appendChild(statusTd);

        let deleteTd = document.createElement('td');
        deleteTd.classList.add('deleteBus');
        let deleteI = document.createElement('i');
        deleteI.classList.add('fas');
        deleteI.classList.add('fa-times');
        deleteI.onmouseover = "console.log(1)";
        deleteI.onclick = 'removeBus(this);updateStudents()';
        deleteTd.appendChild(deleteI);
        row.appendChild(deleteTd);
        document.getElementById('table').appendChild(row);

    }

    const weather = data.weather;
    const weatherDiv = document.getElementById("weather");
    weatherDiv.innerHTML = "";

    const img = document.createElement("img");
    const status = document.createElement("p");
    const temperature = document.createElement("p");
    const feelsLike = document.createElement("p");
    img.setAttribute("src", weather.icon);
    status.innerHTML = weather.status
    temperature.innerHTML = `Temperature: ${weather.temperature}`
    feelsLike.innerHTML = `Feels like: ${weather.feelsLike}`
    weatherDiv.appendChild(img);
    weatherDiv.appendChild(status);
    weatherDiv.appendChild(temperature);
    weatherDiv.appendChild(feelsLike);
}
socket.on('update',(data)=>{
    //socket.emit('debug',JSON.stringify(data));
    parseBuses(data);
});