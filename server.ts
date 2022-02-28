import express, {Application, Request, Response} from "express";
import {router} from "./server/router";
import path from "path";
import bodyParser from "body-parser";
import {createServer} from "http";
import {Server} from "socket.io";
import {read, write, writeBuses} from "./server/ymlController";


const app: Application = express();
const httpServer = createServer(app);
const io  = new Server(httpServer);

const PORT = process.env.PORT || 3000;


//root socket
io.of('/main').on("connection",(socket)=>{
    //console.log(`new connection on root (id:${socket.id})`);
    socket.on('debug',(data)=>{
        //console.log(`debug(root): ${data}`);
    })
})

//admin socket
io.of('/admin').on("connection",(socket)=>{
    //console.log(`new connection on admin (id:${socket.id})`);
    socket.on('update',(data)=>{
        //console.log(JSON.stringify(data))
        let buses = []
        for(const k of Object.keys(data)){
            buses.push(data[k]);
        }
        writeBuses(buses);
        setTimeout(()=>{
            io.of('/main').emit('update',read());
            socket.broadcast.emit('recieve',read());
        },1000);
    })
    socket.on('debug',(data)=>{
        console.log(`debug(admin): ${data}`);
    })
})



app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));

app.use("/", router);

app.use("/css", express.static(path.resolve(__dirname, "static/css")));
app.use("/js", express.static(path.resolve(__dirname, "static/ts")));

httpServer.listen(PORT, () => {console.log(`Server is running on port ${PORT}`)});