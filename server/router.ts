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
    let token = req.body.token; //get the token from the request body
    let ticket = await oAuth2.verifyIdToken({ //verify and decode the id_token
        idToken: token,
        audience: CLIENT_ID
    });
    req.session!.userEmail = <string> (<TokenPayload> ticket.getPayload()).email;
    console.log("here");
    console.log(req.session!.userEmail);
});

function authorize(req: Request) {
    // Gives user admin privledges if they are in the whitelist
    req.session!.isAdmin = readWhitelist().users.includes(req.session!.userEmail); 
}
// Admin page. This is where bus information can be updated from
// Reads from data file and displays data
router.get("/admin", async (req: Request, res: Response) => {
    console.log(1);
    if (!req.session!.userEmail) {
        console.log(2);
        res.redirect("/login");
        return;
    }
    authorize(req);
    if (req.session!.isAdmin) {
        res.render("admin", {data: read()});
    }
    else {
        res.redirect("/unauthroized");
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