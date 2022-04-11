import express, {Application, Request, Response} from "express";
import {router} from "./server/router";
import path from "path";
import fs from "fs";
import bodyParser from "body-parser";
import {createServer} from "http";
import {Server} from "socket.io";
import {readData, writeBuses, writeWeather, BusData} from "./server/ymlController";
import {startWeather} from "./server/weatherController";
import session from "express-session";

const app: Application = express();
const httpServer = createServer(app);
const io  = new Server(httpServer);

const PORT = process.env.PORT || 5182;

type BusCommand = {
    type: string
    data: BusData
}

const buses = readData().buses;

//root socket
io.of("/").on("connection", (socket) => {
    //console.log(`new connection on root (id:${socket.id})`);
    socket.on("debug", (data) => {
        //console.log(`debug(root): ${data}`);
    });
});

//admin socket
io.of("/admin").on("connection", (socket) => {
    socket.on("updateMain", (command: BusCommand) => {
        switch (command.type) {
            case "add":
                const busAfter = buses.find((otherBus) => {
                    return parseInt(command.data.number) < parseInt(otherBus.number);
                });
                let index: number;
                if (busAfter) {
                    index = buses.indexOf(busAfter);
                }
                else {
                    index = buses.length;
                }
                buses.splice(index, 0, command.data);
                break;
            case "update":
                
                buses[buses.indexOf(buses.find((bus) => {return bus.number == command.data.number})!)] = command.data;
                break;
            case "delete":
                buses.splice(buses.indexOf(buses.find((bus) => {return bus.number == command.data.number})!), 1);
                break;
            default:
                throw `Invalid bus command: ${command.type}`;
        }
        writeBuses(buses);
        buses.forEach((bus) => {console.log(bus.number)});
        io.of("/").emit("updateBuses", command);
        io.of("/admin").emit("updateBuses", command);
    });
    socket.on("debug", (data) => {
        console.log(`debug(admin): ${data}`);
    });
});

app.set("view engine", "ejs"); // Allows res.render() to render ejs
app.use(session({
    secret: "KQdqLPDjaGUWPXFKZrEGYYANxsxPvFMwGYpAtLjCCcN",
    resave: true,
    saveUninitialized: true
})); // Allows use of req.session
app.use(bodyParser.urlencoded({extended: true})); // Allows html forms to be accessed with req.body
app.use(bodyParser.json()); // Allows use of json format for req.body

app.use("/", router); // Imports routes from server/router.ts

app.use("/css", express.static(path.resolve(__dirname, "static/css")));
app.use("/js", express.static(path.resolve(__dirname, "static/ts")));
app.use("/img", express.static(path.resolve(__dirname, "static/img")));

startWeather(io);

// Code to reset bus list automatically at midnight
function resetBuses() {
    resetDatafile();
    setInterval(resetDatafile, 86400000);
}
function resetDatafile() {
    const busesDatafile = path.resolve(__dirname, "./data/buses.yml");
    const defaultBusesDatafile = path.resolve(__dirname, "./data/defaultBuses.txt");
    fs.writeFileSync(busesDatafile, fs.readFileSync(defaultBusesDatafile));
    io.of("/").emit("updateBuses", readData());
    io.of("/admin").emit("updateBuses", readData());
}
const midnight = new Date();
midnight.setDate(midnight.getDate() + 1);
midnight.setHours(5, 0, 0, 0);
setTimeout(resetBuses, midnight.valueOf() - new Date().valueOf());

// Starts server
httpServer.listen(PORT, () => {console.log(`Server is running on port ${PORT}`)});