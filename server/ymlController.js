"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.write = exports.read = void 0;
const js_yaml_1 = __importDefault(require("js-yaml"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const filepath = path_1.default.resolve(__dirname, "../data/busData.yml");
// Load data file
function read() {
    if (!fs_1.default.existsSync(filepath)) {
        if (!fs_1.default.existsSync(path_1.default.resolve(__dirname, "../data"))) {
            fs_1.default.mkdirSync(path_1.default.resolve(__dirname, "../data"));
        }
        const data = `buses:
-
    number: ''
    change: ''
    status: 'NOT HERE'
weather: ''`;
        fs_1.default.writeFileSync(filepath, data);
    }
    return js_yaml_1.default.load(fs_1.default.readFileSync(filepath, "utf-8"));
}
exports.read = read;
// Edit data object
function write(data) {
    const buses = [];
    if (typeof data.busNumber === "string" &&
        typeof data.busChange === "string" &&
        typeof data.busStatus === "string") {
        buses.push({ number: data.busNumber, change: data.busChange, status: data.busStatus });
    }
    else {
        for (let i = 0; i < data.busNumber.length; i++) {
            buses.push({ number: data.busNumber[i], change: data.busChange[i], status: data.busStatus[i] });
        }
    }
    fs_1.default.writeFileSync(filepath, js_yaml_1.default.dump({ buses: buses, weather: data.weather }));
}
exports.write = write;
