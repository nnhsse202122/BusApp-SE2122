"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readWhitelist = exports.writeBuses = exports.writeWeather = exports.readData = void 0;
const js_yaml_1 = __importDefault(require("js-yaml"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const busesDatafile = path_1.default.resolve(__dirname, "../data/buses.yml");
const defaultBusesDatafile = path_1.default.resolve(__dirname, "../data/defaultBuses.txt");
const weatherDatafile = path_1.default.resolve(__dirname, "../data/weather.yml");
const defaultWeatherDatafile = path_1.default.resolve(__dirname, "../data/defaultWeather.txt");
const whitelist = path_1.default.resolve(__dirname, "../data/whitelist.yml");
// Load data file. If no file exists creates one
function readData() {
    // Makes data files if they don't exist
    if (!fs_1.default.existsSync(busesDatafile)) {
        fs_1.default.writeFileSync(busesDatafile, fs_1.default.readFileSync(defaultBusesDatafile));
    }
    if (!fs_1.default.existsSync(weatherDatafile)) {
        fs_1.default.writeFileSync(weatherDatafile, fs_1.default.readFileSync(defaultWeatherDatafile));
    }
    const buses = js_yaml_1.default.load(fs_1.default.readFileSync(busesDatafile, "utf-8"));
    const weather = js_yaml_1.default.load(fs_1.default.readFileSync(weatherDatafile, "utf-8"));
    return Object.assign(Object.assign({}, buses), weather);
}
exports.readData = readData;
// Writes to data file bus first formating the arrays provided by the form and then combining it with weather
// export function write(data: {
//     busNumber: string | string[], 
//     busChange: string | string[], 
//     busArrival: string | string[],
//     busStatus: string | string[]}
//     ) {
//     const buses: Bus[] = [];
//     // In case of one bus
//     if (typeof data.busNumber === "string" && 
//         typeof data.busChange === "string" && 
//         typeof data.busArrival === "string" && 
//         typeof data.busStatus === "string"
//     ) {
//         buses.push({number: data.busNumber, change: data.busChange, arrival: data.busArrival, status: data.busStatus});
//     }
//     // In case of multiple buses
//     else {
//         for(let i = 0; i < data.busNumber.length; i++) {
//             buses.push({number: data.busNumber[i], change: data.busChange[i], arrival: data.busArrival[i], status: data.busStatus[i]});
//         }    
//     }
//     fs.writeFileSync(busesDatafile, yaml.dump({buses: buses}));
// }
function writeWeather(weather) {
    const data = {
        status: weather.current.condition.text,
        icon: weather.current.condition.icon,
        temperature: weather.current.temp_f,
        feelsLike: weather.current.feelslike_f
    };
    fs_1.default.writeFileSync(weatherDatafile, js_yaml_1.default.dump({ weather: data }));
}
exports.writeWeather = writeWeather;
function writeBuses(data) {
    fs_1.default.writeFileSync(busesDatafile, js_yaml_1.default.dump({ buses: data }));
}
exports.writeBuses = writeBuses;
// Reads a list of users who are allowed access to the admin page
function readWhitelist() {
    return js_yaml_1.default.load(fs_1.default.readFileSync(whitelist, "utf-8"));
}
exports.readWhitelist = readWhitelist;
