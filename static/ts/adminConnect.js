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
    
    socket.emit('update',pullData());
}
function parseBuses(data){
    let busList = data.buses;
    let busNums = [];
    for(const b of busList){
        let row = document.getElementById('bus_'+b.number);
        if(row){
            busNums.push(b.number)
            row.children[0].children[0].value = b.number;
            row.children[1].children[0].value = b.change;
            row.children[2].children[0].value = b.arrival;
            row.children[3].children[0].value = b.status;
        } else {
            row = document.createElement('tr');
            row.id = 'bus_'+b.number;
            let numberTd = document.createElement('td');
            let numberInput = document.createElement('input');
            numberInput.classList.add('tableInput');
            numberInput.type = 'number';
            numberInput.name = 'busNumber';
            numberInput.value = b.number;
            numberInput.required = true;
            numberTd.appendChild(numberInput);
            row.appendChild(numberTd)

            let changeTd = document.createElement('td');
            let changeInput = document.createElement('input');
            changeInput.classList.add('tableInput');
            changeInput.type = 'number';
            changeInput.name = 'busChange';
            changeInput.value = b.change;
            changeTd.appendChild(changeInput);
            row.appendChild(changeTd);

            let arrivalTd = document.createElement('td');
            let arrivalInput = document.createElement('input');
            arrivalInput.classList.add('tableInput');
            arrivalInput.type = 'text';
            arrivalInput.name = 'busArrival';
            arrivalInput.value = b.arrival;
            arrivalInput.required = true;
            arrivalTd.appendChild(arrivalInput);
            row.appendChild(arrivalTd)

            let statusTd = document.createElement('td');
            let statusSelect = document.createElement('select');
            for(const s in ['NOT HERE','HERE',"LOADING",'GONE']){
                let newOption = document.createElement('option');
                newOption.innerHTML = s;
                newOption.value = s;
            }
            statusSelect.value = b.status;
            statusTd.appendChild(statusSelect);
            row.appendChild(statusTd);
            document.getElementById('table').appendChild(row);
        }

    }

}
socket.on('recieve',(data)=>{
    //socket.emit('debug',JSON.stringify(data));
    parseBuses(data);
})