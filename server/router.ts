import express, {Request, Response} from "express";
import {createServer} from "http";
import {Server} from "socket.io";
import {read, write} from "../data/YmlController";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);
io.on("connection")


app.get("/", (req: Request, res: Response) => {
    res.render("index", {buses: read()});
});

app.get("/admin", (req: Request, res: Response) => {
    res.render("admin", {buses: read()});
});

app.post("/api/save", (req: Request, res: Response) => {
    write(req.body);
    res.redirect("/admin");
});