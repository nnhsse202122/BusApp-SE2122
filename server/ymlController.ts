import yaml from "js-yaml";
import path from "path";
import fs from "fs";

const busesDatafile = path.resolve(__dirname, "../data/buses.yml");
const defaultBusesDatafile = path.resolve(__dirname, "../data/defaultBuses.txt");
const weatherDatafile = path.resolve(__dirname, "../data/weather.yml");
const defaultWeatherDatafile = path.resolve(__dirname, "../data/defaultWeather.txt");
const whitelist = path.resolve(__dirname, "../data/whitelist.yml");

type Bus = {number: string, change: string, arrival: string, status: string};
type Weather = {status: string, icon: string, temperature: string, feelsLike: string}

// Load data file. If no file exists creates one
export function readData() {
    // Makes data files if they don't exist
    if (!fs.existsSync(busesDatafile)) {
        fs.writeFileSync(busesDatafile, fs.readFileSync(defaultBusesDatafile));
    }
    if (!fs.existsSync(weatherDatafile)) {
        fs.writeFileSync(weatherDatafile, fs.readFileSync(defaultWeatherDatafile));
    }
    const buses = <{buses: Bus[]}> yaml.load(fs.readFileSync(busesDatafile, "utf-8"));
    const weather = <{weather: Weather}> yaml.load(fs.readFileSync(weatherDatafile, "utf-8"));
    return {...buses, ...weather};
}

export function writeBuses(data: Bus[]){
    fs.writeFileSync(busesDatafile, yaml.dump({buses: data}));
}

export function writeWeather(weather: any) {
    const data: Weather = {
        status: <string> weather.current.condition.text,
        icon: <string> weather.current.condition.icon,
        temperature: <string> weather.current.temp_f,
        feelsLike: <string> weather.current.feelslike_f
    }
    fs.writeFileSync(weatherDatafile, yaml.dump({weather: data}));
}

// Reads a list of users who are allowed access to the admin page
export function readWhitelist() {
    return <{admins: string[]}> yaml.load(fs.readFileSync(whitelist, "utf-8"));
}
