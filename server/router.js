"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const google_auth_library_1 = require("google-auth-library");
const ymlController_1 = require("./ymlController");
exports.router = express_1.default.Router();
const CLIENT_ID = "319647294384-m93pfm59lb2i07t532t09ed5165let11.apps.googleusercontent.com";
const oAuth2 = new google_auth_library_1.OAuth2Client(CLIENT_ID);
// Homepage. This is where students will view bus information from. 
// Reads from data file and displays data
exports.router.get("/", (req, res) => {
    res.render("index", { data: (0, ymlController_1.read)() });
});
exports.router.post("/auth/v1/google", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { token } = req.body; //get the token from the request body
    let ticket = yield oAuth2.verifyIdToken({
        idToken: token,
        audience: CLIENT_ID
    });
    let email = ticket.getPayload().email; //get the user data we care about from the id_token
    req.session.userEmail = email;
    if ((0, ymlController_1.readWhitelist)().users.includes(email)) {
        let user = { isAdmin: true };
        res.status(201);
        res.json(user);
    }
    else {
        let user = { isAdmin: false };
        res.status(201);
        res.json(user);
    }
}));
// Admin page. This is where bus information can be updated from
// Reads from data file and displays data
exports.router.get("/admin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.session.userEmail) {
        if ((0, ymlController_1.readWhitelist)().users.includes(req.session.userEmail)) {
            req.user = { isAdmin: true };
        }
        else {
            req.user = { isAdmin: false };
        }
    }
    console.log(req.session.userEmail, req.user);
    if (!req.session.userEmail || !req.user || !req.user.isAdmin) {
        res.redirect("/login");
        return;
    }
    res.render("admin", { data: (0, ymlController_1.read)() });
}));
exports.router.get("/login", (req, res) => {
    res.render("login");
});
// Post request to update bus information. 
// Writes to data file with the information provided by the form then redirects back to admin
exports.router.post("/api/save", (req, res) => {
    (0, ymlController_1.write)(req.body);
    res.redirect("/admin");
});
