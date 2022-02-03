const socket = io('/admin');

function updateStudents(){
    socket.emit('update');
}

