"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const ymlController_1 = require("./ymlController");
exports.router = express_1.default.Router();
exports.router.get("/", (req, res) => {
    res.render("index", { buses: (0, ymlController_1.read)() });
});
exports.router.get("/admin", (req, res) => {
    res.render("admin", { buses: (0, ymlController_1.read)() });
});
exports.router.post("/api/save", (req, res) => {
    //console.log(req.body);
    (0, ymlController_1.write)(req.body);
    res.redirect("/admin");
});
