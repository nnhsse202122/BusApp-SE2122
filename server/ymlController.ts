import yaml from "js-yaml";
import path from "path";
import fs from "fs";

const busesDatafile = path.resolve(__dirname, "../data/buses.yml");
const defaultBusesDatafile = path.resolve(__dirname, "../data/defaultBuses.txt");
const weatherDatafile = path.resolve(__dirname, "../data/weather.yml");
const defaultWeatherDatafile = path.resolve(__dirname, "../data/defaultWeather.txt");
const whitelist = path.resolve(__dirname, "../data/whitelist.yml");

export type BusData = {number: string, change: string | undefined, arrival: string | undefined, status: string | undefined};
type Weather = {status: string, icon: string, temperature: string, feelsLike: string}

// Reads the current data from both buses.yml and weather.yml
export function readData() {
    // Makes data files if they don't exist
    if (!fs.existsSync(busesDatafile)) {
        fs.writeFileSync(busesDatafile, fs.readFileSync(defaultBusesDatafile));
    }
    if (!fs.existsSync(weatherDatafile)) {
        fs.writeFileSync(weatherDatafile, fs.readFileSync(defaultWeatherDatafile));
    }
    // Reads data using js-yaml and return them in an object
    const buses = <{buses: BusData[]}> yaml.load(fs.readFileSync(busesDatafile, "utf-8"));
    const weather = <{weather: Weather}> yaml.load(fs.readFileSync(weatherDatafile, "utf-8"));
    return {...buses, ...weather};
}

// Writes given data to buses.yml
export function writeBuses(data: BusData[]){
    fs.writeFileSync(busesDatafile, yaml.dump({buses: data}));
}

// Extract weather data from weather variable and writes to weather.yml
export function writeWeather(weather: any) {
    const data: Weather = {
        status: <string> weather.current.condition.text,
        icon: <string> weather.current.condition.icon,
        temperature: <string> weather.current.temp_f,
        feelsLike: <string> weather.current.feelslike_f
    }
    fs.writeFileSync(weatherDatafile, yaml.dump({weather: data}));
}

// Reads a list of users who are allowed access to the admin page from whitelist.yml
export function readWhitelist() {
    return <{admins: string[]}> yaml.load(fs.readFileSync(whitelist, "utf-8"));
}
