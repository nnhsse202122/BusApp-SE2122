import yaml from "js-yaml";
import path from "path";
import fs, {existsSync} from "fs";

const dataFile = path.resolve(__dirname, "../data/busData.yml");

type Bus = {number: string, change: string, arrival: string, status: string};

// Load data file. If no file exists creates one
export function readData() {
    // Checks if datafile exists
    if (!fs.existsSync(dataFile)) {
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
        fs.writeFileSync(dataFile, data);
    }
    return <Bus[]> yaml.load(fs.readFileSync(dataFile, "utf-8"));
}

// Writes to data file bus first formating the arrays provided by the form and then combining it with weather
export function writeData(data: {
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
    fs.writeFileSync(dataFile, yaml.dump({buses: buses, weather: data.weather}));
}

// Reads a list of users who are allowed access to the admin page
export function readWhitelist() {
    return <{admins: string[]}> yaml.load(fs.readFileSync(path.resolve(__dirname, "../data/whitelist.yml"), "utf-8"));
}