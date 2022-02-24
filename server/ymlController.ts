import yaml from "js-yaml";
import fs, { existsSync } from "fs";
import path from "path";

const filepath = path.resolve(__dirname, "../data/busData.yml");

type Bus = {number: string, change: string, arrival: string, status: string};

// Load data file. If no file exists creates one
export function read() {
    // Checks if datafile exists
    if (!fs.existsSync(filepath)) {
        // Creates a data directory if none exists
        if (!fs.existsSync(path.resolve(__dirname, "../data"))) {
            fs.mkdirSync(path.resolve(__dirname, "../data"));
        }
        const data = 
`buses:
-
    number: ''
    change: ''
    arrival: ''
    status: 'NOT HERE'
weather: ''`;  
        // Creates data file
        fs.writeFileSync(filepath, data);
    }
    return <Bus[]> yaml.load(fs.readFileSync(filepath, "utf-8"));
}

// Writes to data file bus first formating the arrays provided by the form and then combining it with weather
export function write(data: {
    busNumber: string | string[], 
    busChange: string | string[], 
    busArrival: string | string[],
    busStatus: string | string[],
    weather: string}
    ) {
    const buses: Bus[] = [];
    // In case of one bus
    if (typeof data.busNumber === "string" && 
        typeof data.busChange === "string" && 
        typeof data.busArrival === "string" && 
        typeof data.busStatus === "string"
    ) {
        buses.push({number: data.busNumber, change: data.busChange, arrival: data.busArrival, status: data.busStatus});
    }
    // In case of multiple buses
    else {
        for(let i = 0; i < data.busNumber.length; i++) {
            buses.push({number: data.busNumber[i], change: data.busChange[i], arrival: data.busArrival[i], status: data.busStatus[i]});
        }    
    }
    fs.writeFileSync(filepath, yaml.dump({buses: buses, weather: data.weather}));
}
export function writeBuses(data: Bus[]){
    fs.writeFileSync(filepath, yaml.dump({buses: data, weather: ''}));
}
