"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
const ymlController_1 = require("./server/ymlController");
const express_session_1 = __importDefault(require("express-session"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const app = (0, express_1.default)();
const httpServer = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(httpServer);
const PORT = process.env.PORT || 3000;
//root socket
io.of('/main').on("connection", (socket) => {
    console.log(`new connection on root (id:${socket.id})`);
    socket.on('debug', (data) => {
        //console.log(`debug(root): ${data}`);
    });
});
//admin socket
io.of('/admin').on("connection", (socket) => {
    console.log(`new connection on admin (id:${socket.id})`);
    socket.on('update', () => {
        setTimeout(() => {
            io.of('/main').emit('update', (0, ymlController_1.readData)());
        }, 1000);
    });
    socket.on('debug', (data) => {
        //console.log(`debug(admin): ${data}`);
    });
});
app.set("view engine", "ejs"); // Allows res.render() to render ejs
app.use((0, express_session_1.default)({
    secret: "KQdqLPDjaGUWPXFKZrEGYYANxsxPvFMwGYpAtLjCCcN",
    resave: true,
    saveUninitialized: true
})); // Allows use of req.session
app.use(body_parser_1.default.urlencoded({ extended: true })); // Allows html forms to be accessed with req.body
app.use(body_parser_1.default.json()); // Allows use of json format for req.body
app.use("/", router_1.router); // Imports routes from server/router.ts
app.use("/css", express_1.default.static(path_1.default.resolve(__dirname, "static/css")));
app.use("/js", express_1.default.static(path_1.default.resolve(__dirname, "static/ts")));
function getWeather() {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield (0, node_fetch_1.default)("http://api.weatherapi.com/v1/current.json?"
            + new URLSearchParams([["key", "8afcf03c285047a1b6e201401222202"], ["q", "60540"]]));
        (0, ymlController_1.writeWeather)((yield res.json()));
    });
}
getWeather();
setInterval(getWeather, 300000);
httpServer.listen(PORT, () => { console.log(`Server is running on port ${PORT}`); });
