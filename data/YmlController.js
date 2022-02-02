"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.write = exports.read = void 0;
const js_yaml_1 = __importDefault(require("js-yaml"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const filepath = "./busData.yml";
// Load data file
function read() {
    return js_yaml_1.default.load(fs_1.default.readFileSync(path_1.default.resolve(__dirname, filepath), "utf-8"));
}
exports.read = read;
// Edit data object
function write(data) {
    const buses = [];
    for (let i = 0; i < data.busNumber.length; i++) {
        buses.push({ number: data.busNumber[i], change: data.busChange[i], status: data.busStatus[i] });
    }
    fs_1.default.writeFile(path_1.default.resolve(__dirname, filepath), js_yaml_1.default.dump({ buses: buses, weather: data.weather }), (err) => {
        if (err)
            console.log(err);
    });
}
exports.write = write;
