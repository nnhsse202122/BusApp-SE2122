const socket = io('/');

socket.on("update", (data) => {
    const table = document.getElementById("busTable");
    table.innerHTML = "";
    const firstRow = table.insertRow();
    firstRow.insertCell().innerHTML = "Bus Number";
    firstRow.insertCell().innerHTML = "Bus Change";
    firstRow.insertCell().innerHTML = "Bus Arrived";
    firstRow.insertCell().innerHTML = "Status";

    const buses = data.buses;
    for (const bus of buses) {
        const row = table.insertRow();
        row.insertCell().innerHTML = bus.number;
        row.insertCell().innerHTML = bus.change;
        row.insertCell().innerHTML = bus.arrival;
        row.insertCell().innerHTML = bus.status;
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
});

{/* <div id="weather">
                <p><%= data.weather.status %> </p>
                <img src=<%= data.weather.icon %>>
                <p>Temperature: <%= data.weather.temperature %></p>
                <p>Real feel: <%= data.weather.real_feel %></p>
            </div> */}
