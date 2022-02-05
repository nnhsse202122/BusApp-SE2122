import express from "express";
import { read, write } from "./ymlController";
export const router = express.Router();
// Homepage. This is where students will view bus information from. 
// Reads from data file and displays data
router.get("/", (req, res) => {
    res.render("index", { data: read() });
});
// Admin page. This is where bus information can be updated from
// Reads from data file and displays data
router.get("/admin", (req, res) => {
    res.render("admin", { data: read() });
});
router.get("/login", (req, res) => {
    res.render("login");
});
// Post request to update bus information. 
// Writes to data file with the information provided by the form then redirects back to admin
router.post("/api/save", (req, res) => {
    write(req.body);
    res.redirect("/admin");
});
