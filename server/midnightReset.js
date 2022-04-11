"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startMidnightReset = void 0;
const ymlController_1 = require("./ymlController");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
// Code to reset bus list automatically at midnight
function resetBuses(io) {
    resetDatafile(io);
    setInterval(() => { resetBuses(io); }, 86400000);
}
function resetDatafile(io) {
    const busesDatafile = path_1.default.resolve(__dirname, "./data/buses.yml");
    const defaultBusesDatafile = path_1.default.resolve(__dirname, "./data/defaultBuses.txt");
    fs_1.default.writeFileSync(busesDatafile, fs_1.default.readFileSync(defaultBusesDatafile));
    io.of("/").emit("updateBuses", (0, ymlController_1.readData)());
    io.of("/admin").emit("updateBuses", (0, ymlController_1.readData)());
}
function startMidnightReset(io) {
    const midnight = new Date();
    midnight.setDate(midnight.getDate() + 1);
    midnight.setHours(5, 0, 0, 0);
    setTimeout(() => { resetBuses(io); }, midnight.valueOf() - new Date().valueOf());
}
exports.startMidnightReset = startMidnightReset;
