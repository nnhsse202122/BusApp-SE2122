import express, {Application, Request, Response} from "express";
import {router} from "./server/router";
import path from "path";
import bodyParser from "body-parser";
import {createServer} from "http";
import {Server} from "socket.io";
import {readData, writeData} from "./server/ymlController";
import session from "express-session";

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
    socket.on('update',()=>{
        setTimeout(()=>{
            io.of('/main').emit('update',readData());
        },1000);
    })
    socket.on('debug',(data)=>{
        //console.log(`debug(admin): ${data}`);
    })
})

app.set("view engine", "ejs"); // Allows res.render() to render ejs
app.use(session({secret: "Shh, its a secret!"})); // Allows use of req.session
app.use(bodyParser.urlencoded({extended: true})); // Allows html forms to be accessed with req.body
app.use(bodyParser.json()); // Allows use of json format for req.body

app.use("/", router); // Imports routes from server/router.ts

app.use("/css", express.static(path.resolve(__dirname, "static/css")));
app.use("/js", express.static(path.resolve(__dirname, "static/ts")));

httpServer.listen(PORT, () => {console.log(`Server is running on port ${PORT}`)});