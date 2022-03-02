import express, {Application, Request, Response} from "express";
import {router} from "./server/router";
import path from "path";
import bodyParser from "body-parser";
import {createServer} from "http";
import {Server} from "socket.io";
import {readData, writeBuses, writeWeather} from "./server/ymlController";
import session from "express-session";
import fetch from "node-fetch"

const app: Application = express();
const httpServer = createServer(app);
const io  = new Server(httpServer);

const PORT = process.env.PORT || 3000;

//root socket
io.of('/').on("connection",(socket)=>{
    //console.log(`new connection on root (id:${socket.id})`);
    socket.on('debug',(data)=>{
        //console.log(`debug(root): ${data}`);
    })
})

//admin socket
io.of('/admin').on("connection",(socket)=>{
    socket.on('updateMain', (data)=> {
        let buses = [];
        for(const k of Object.keys(data)){
            buses.push(data[k]);
        }
        console.log(buses);
        writeBuses(buses);
        io.of('/').emit('update', readData());
        io.of('/admin').emit('update', readData());
    })
    socket.on('debug', (data)=>{
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

async function getWeather() {
    const res = await fetch("http://api.weatherapi.com/v1/current.json?" 
        + new URLSearchParams([["key", "8afcf03c285047a1b6e201401222202"], ["q", "60540"]]
    ));
    writeWeather((await res.json()));
}
getWeather();
setInterval(getWeather, 300000);



httpServer.listen(PORT, () => {console.log(`Server is running on port ${PORT}`)});