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
    socket.emit('debug','test');
    socket.emit('update',pullData());
}

