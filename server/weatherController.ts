import {readData, writeWeather} from "./ymlController";
import {Server} from "socket.io";

// Code to update weather automcatically every 5 minutes
async function getWeather(io: Server) {
    const res = await fetch("http://api.weatherapi.com/v1/current.json?" 
        + new URLSearchParams([["key", "8afcf03c285047a1b6e201401222202"], ["q", "60540"]]
    ));
    writeWeather(await res.json());
    io.of("/").emit("update", readData());
    io.of("/admin").emit("update", readData());
}

export function startWeather(io: Server) {
    getWeather(io);
    setInterval(() => {getWeather(io)}, 300000);
}
