const socket = io('/');

socket.on("update", (data) => {
    const html = ejs.render(document.getElementById("getRender").getAttribute("render"), {data: data});
    document.getElementById("content").innerHTML = html;
});