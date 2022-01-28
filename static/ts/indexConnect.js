const socket = io('/main');
function getBusRow(number){
    var row = document.getElementById(number);
    if(row){
        return row;
    } else {
        return null;
    }
}
function getBusses(){
    var table = document.getElementById('busTable').children[0];
    var id = [];
    for(var i = 1; i < table.children.length; i++){
        var bus = table.children[i];
        id.push(bus.id);
    }

    return id;
}

socket.on('update',(data)=>{
    socket.emit('debug','recieved data');
    data.forEach((bus) => {
        if(getBusses().includes("bus_"+bus.number)){
            //updating a bus in both the updated file and the html table(editing a bus)
            socket.emit('debug','editing bus '+bus.number)
            var busRow = document.getElementById("bus_"+bus.number);
            
            busRow.children[1].innerHTML = bus.status;
        } else {
            //a bus in the file but not the table(adding a bus)
            socket.emit('debug','adding bus ' + bus.number);
            var busRow = document.createElement('tr');
            busRow.id = 'bus_'+bus.number;
            var busNumber = document.createElement('td');
            busNumber.innerHTML = bus.number;
            var busStatus = document.createElement('td');
            busStatus.innerHTML = bus.status;
            busRow.appendChild(busNumber);
            busRow.appendChild(busStatus);
            document.getElementById('busTable').children[0].appendChild(busRow);
        }
    });
    //delete buses that are not in data file(removing a bus)
    var busIds = [];
    data.forEach((b)=>{
        busIds.push('bus_'+b.number);
    })
    getBusses().forEach((bus)=>{
        if(!busIds.includes(bus)){
            socket.emit('debug',`deleting bus ${bus}`);
            getBusRow(bus).remove();
        }
    })
})