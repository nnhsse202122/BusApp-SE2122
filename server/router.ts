import express, {Request, Response} from "express";
import {read, write} from "./ymlController";

export const router = express.Router();

// Homepage. This is where students will view bus information from. 
// Reads from data file and displays data
router.get("/", (req: Request, res: Response) => {
    res.render("index", {data: read()});
});

// Admin page. This is where bus information can be updated from
// Reads from data file and displays data
router.get("/admin", (req: Request, res: Response) => {
    res.render("admin", {data: read()});
});

// Post request to update bus information. 
// Writes to data file with the information provided by the form then redirects back to admin
router.post("/api/save", (req: Request, res: Response) => {
    write(req.body);
    res.redirect("/admin");
});