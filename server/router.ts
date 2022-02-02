import express, {Request, Response} from "express";
import {read, write} from "./ymlController";

export const router = express.Router();

router.get("/", (req: Request, res: Response) => {
    res.render("index", {buses: read()});
});

router.get("/admin", (req: Request, res: Response) => {
    res.render("admin", {buses: read()});
});

router.post("/api/save", (req: Request, res: Response) => {
    //console.log(req.body);
    write(req.body);
    res.redirect("/admin");
});