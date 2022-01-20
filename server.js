"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router_1 = require("./server/router");
const path_1 = __importDefault(require("path"));
const body_parser_1 = __importDefault(require("body-parser"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const app = (0, express_1.default)();
const httpServer = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(httpServer);
const PORT = process.env.PORT || 3000;
//root socket
io.of('/').on("connection", (socket) => {
    console.log(`new connection on root (id:${socket.id})`);
});
//admin socket
io.of('/admin').on("connection", (socket) => {
    console.log(`new connection on root (id:${socket.id})`);
});
app.set("view engine", "ejs");
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use("/", router_1.router);
app.use("/css", express_1.default.static(path_1.default.resolve(__dirname, "static/css")));
app.use("/js", express_1.default.static(path_1.default.resolve(__dirname, "static/ts")));
httpServer.listen(PORT, () => { console.log(`Server is running on port ${PORT}`); });
