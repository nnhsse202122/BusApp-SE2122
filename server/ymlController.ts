import yaml from "js-yaml";
import fs, { existsSync } from "fs";
import path from "path";

const filepath = path.resolve(__dirname, "../data/busData.yml");

type Bus = {number: string, change: string, status: string};

// Load data file
export function read() {
    if (!fs.existsSync(filepath)) {
        const data = "-\n  number: ''\n  change: ''\n  status: 'NOT HERE'";
        fs.writeFileSync(filepath, data);
    }
    return <Bus[]> yaml.load(fs.readFileSync(filepath, "utf-8"));
}

// Edit data object
export function write(data: {
    busNumber: string | string[], 
    busChange: string | string[], 
    busStatus: string | string[]}
    ) {
    const buses: Bus[] = [];
    if (typeof data.busNumber === "string" && 
        typeof data.busChange === "string" && 
        typeof data.busStatus === "string"
    ) {
        buses.push({number: data.busNumber, change: data.busChange, status: data.busStatus});
    }
    else {
        for(let i = 0; i < data.busNumber.length; i++) {
            buses.push({number: data.busNumber[i], change: data.busChange[i], status: data.busStatus[i]});
        }    
    }
    fs.writeFileSync(filepath, yaml.dump(buses));
}

