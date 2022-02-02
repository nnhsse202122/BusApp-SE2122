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
export function write(data: {busNumber: string[], busChange: string[], busStatus: string[]}) {
    const buses: Bus[] = [];
    for(let i = 0; i < data.busNumber.length; i++) {
        buses.push({number: data.busNumber[i], change: data.busChange[i], status: data.busStatus[i]});
    }
    fs.writeFileSync(filepath, yaml.dump(buses));
}

