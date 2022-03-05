const socket = io('/');

socket.on("update", (data) => {
    const html = ejs.render(render, data);
    document.getElementById("content").innerHTML = html;
});