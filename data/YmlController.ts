import yaml from "js-yaml";
import fs from "fs";
import path from "path";

const filepath = "./busData.yml";

type Bus = {number: string, status: string};

// Load data file
export function read() {
    return <Bus[]> yaml.load(fs.readFileSync(path.resolve(__dirname, filepath), "utf-8"));
}

// Edit data object
export function write(data: {busNumber: string[], busStatus: string[]}) {
    const buses: Bus[] = [];
    for(let i = 0; i < data.busNumber.length; i++) {
        buses.push({number: data.busNumber[i], status: data.busStatus[i]});
    }
    fs.writeFile(path.resolve(__dirname, filepath), yaml.dump(buses), (err) => {
        if (err) console.log(err);
    });
}

