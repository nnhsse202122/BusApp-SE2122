import {readData, writeWeather} from "./ymlController";
import {Server} from "socket.io";
import path from "path";
import fs from "fs";


// Code to reset bus list automatically at midnight
function resetBuses(io: Server) {
    resetDatafile(io);
    setInterval(() => {resetBuses(io)}, 86400000);
}

function resetDatafile(io: Server) {
    const busesDatafile = path.resolve(__dirname, "./data/buses.yml");
    const defaultBusesDatafile = path.resolve(__dirname, "./data/defaultBuses.txt");
    fs.writeFileSync(busesDatafile, fs.readFileSync(defaultBusesDatafile));
    io.of("/").emit("updateBuses", readData()); 
    io.of("/admin").emit("updateBuses", readData());
}

export function startMidnightReset(io: Server) {
    const midnight = new Date();
    midnight.setDate(midnight.getDate() + 1);
    midnight.setHours(5, 0, 0, 0);
    setTimeout(() => {resetBuses(io)}, midnight.valueOf() - new Date().valueOf());
}