import express, {Request, Response} from "express";
import {OAuth2Client, TokenPayload} from "google-auth-library";
import {read, write, readWhitelist} from "./ymlController";

export const router = express.Router();

const CLIENT_ID = "319647294384-m93pfm59lb2i07t532t09ed5165let11.apps.googleusercontent.com"
const oAuth2 = new OAuth2Client(CLIENT_ID);


// Homepage. This is where students will view bus information from. 
// Reads from data file and displays data
router.get("/", (req: Request, res: Response) => {
    res.render("index", {data: read()});
});

router.post("/auth/v1/google", async (req: Request, res: Response) => { //login.js sends the id_token to this url, we'll verify it and extract its data
    let { token }  = req.body; //get the token from the request body
    let ticket = await oAuth2.verifyIdToken({ //verify and decode the id_token
        idToken: token,
        audience: CLIENT_ID
    });
    let email: string = <string> (<TokenPayload> ticket.getPayload()).email; //get the user data we care about from the id_token
    req.session.userEmail = email; 
    if (readWhitelist().users.includes(email)) {
        let user = {isAdmin: true};
        res.status(201);
        res.json(user);
    }
    else {
        let user = {isAdmin: false};
        res.status(201);
        res.json(user);
    }
})

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