import {readData, writeWeather} from "./ymlController";
import {Server} from "socket.io";
import fetch from "node-fetch";

// Code to update weather automcatically every 5 minutes
async function getWeather(io: Server) {
    // Gets weather info from weatherapi.com
    const res = await fetch("http://api.weatherapi.com/v1/current.json?" 
        + new URLSearchParams([["key", "8afcf03c285047a1b6e201401222202"], ["q", "60540"]]
    ));
    // Writes weather to weather.yml
    writeWeather(await res.json());
    // Emits new weather info to both index and admin
    io.of("/").emit("update", readData());
    io.of("/admin").emit("updateWeather", readData().weather);
}

export function startWeather(io: Server) {
    // Periodically calls getWeather() every 5 mins
    getWeather(io);
    setInterval(() => {getWeather(io)}, 300000);
}
