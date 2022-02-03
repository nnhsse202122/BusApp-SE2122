const socket = io('/admin');

function updateStudents(){
    socket.emit('update');
}
document.getElementById('addBus').addEventListener('click',addBus);
