"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeBuses = exports.write = exports.read = void 0;
const js_yaml_1 = __importDefault(require("js-yaml"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const filepath = path_1.default.resolve(__dirname, "../data/busData.yml");
// Load data file. If no file exists creates one
function read() {
    // Checks if datafile exists
    if (!fs_1.default.existsSync(filepath)) {
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
        fs_1.default.writeFileSync(filepath, data);
    }
    return js_yaml_1.default.load(fs_1.default.readFileSync(filepath, "utf-8"));
}
exports.read = read;
// Writes to data file bus first formating the arrays provided by the form and then combining it with weather
function write(data) {
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
    fs_1.default.writeFileSync(filepath, js_yaml_1.default.dump({ buses: buses, weather: data.weather }));
}
exports.write = write;
function writeBuses(data) {
    fs_1.default.writeFileSync(filepath, js_yaml_1.default.dump({ buses: data, weather: '' }));
}
exports.writeBuses = writeBuses;
