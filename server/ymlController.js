"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readWhitelist = exports.writeData = exports.readData = void 0;
const js_yaml_1 = __importDefault(require("js-yaml"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const dataFile = path_1.default.resolve(__dirname, "../data/busData.yml");
// Load data file. If no file exists creates one
function readData() {
    // Checks if datafile exists
    if (!fs_1.default.existsSync(dataFile)) {
        // Creates a data directory if none exists
        if (!fs_1.default.existsSync(path_1.default.resolve(__dirname, "../data"))) {
            fs_1.default.mkdirSync(path_1.default.resolve(__dirname, "../data"));
        }
        const data = `buses:
-
    number: ''
    change: ''
    arrival: ''
    status: 'NOT HERE'
weather: ''`;
        // Creates data file
        fs_1.default.writeFileSync(dataFile, data);
    }
    return js_yaml_1.default.load(fs_1.default.readFileSync(dataFile, "utf-8"));
}
exports.readData = readData;
// Writes to data file bus first formating the arrays provided by the form and then combining it with weather
function writeData(data) {
    const buses = [];
    // In case of one bus
    if (typeof data.busNumber === "string" &&
        typeof data.busChange === "string" &&
        typeof data.busArrival === "string" &&
        typeof data.busStatus === "string") {
        buses.push({ number: data.busNumber, change: data.busChange, arrival: data.busArrival, status: data.busStatus });
    }
    // In case of multiple buses
    else {
        for (let i = 0; i < data.busNumber.length; i++) {
            buses.push({ number: data.busNumber[i], change: data.busChange[i], arrival: data.busArrival[i], status: data.busStatus[i] });
        }
    }
    fs_1.default.writeFileSync(dataFile, js_yaml_1.default.dump({ buses: buses, weather: data.weather }));
}
exports.writeData = writeData;
// Reads a list of users who are allowed access to the admin page
function readWhitelist() {
    return js_yaml_1.default.load(fs_1.default.readFileSync(path_1.default.resolve(__dirname, "../data/whitelist.yml"), "utf-8"));
}
exports.readWhitelist = readWhitelist;
