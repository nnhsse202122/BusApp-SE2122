"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const ymlController_1 = require("./ymlController");
exports.router = express_1.default.Router();
// Homepage. This is where students will view bus information from. 
// Reads from data file and displays data
exports.router.get("/", (req, res) => {
    res.render("index", { data: (0, ymlController_1.read)() });
});
// Admin page. This is where bus information can be updated from
// Reads from data file and displays data
exports.router.get("/admin", (req, res) => {
    res.render("admin", { data: (0, ymlController_1.read)() });
});
// Post request to update bus information. 
// Writes to data file with the information provided by the form then redirects back to admin
exports.router.post("/api/save", (req, res) => {
    (0, ymlController_1.write)(req.body);
    res.redirect("/admin");
});
