import express, {Request, Response} from "express";
import {OAuth2Client, TokenPayload} from "google-auth-library";
import {read, write, readWhitelist} from "./ymlController";

export const router = express.Router();

const oAuth2 = new OAuth2Client("319647294384-m93pfm59lb2i07t532t09ed5165let11.apps.googleusercontent.com");

// Homepage. This is where students will view bus information from. 
// Reads from data file and displays data
router.get("/", (req: Request, res: Response) => {
    res.render("index", {data: read()});
});

// Admin page. This is where bus information can be updated from
// Reads from data file and displays data
router.get("/admin", async (req: Request, res: Response) => {
    if (!req.cookies.token) {
        res.redirect("/login");
        return;
    }
    const ticket = await oAuth2.verifyIdToken({idToken: req.cookies.token});
    if (readWhitelist().users.includes(<string> (<TokenPayload> ticket.getPayload()).email)) {
        res.render("admin", {data: read()});
    }
    else {
        res.render("unauthorized");
    }
});

router.get("/login", (req: Request, res: Response) => {
    res.render("login");
});

// Post request to update bus information. 
// Writes to data file with the information provided by the form then redirects back to admin
router.post("/api/save", (req: Request, res: Response) => {
    write(req.body);
    res.redirect("/admin");
});