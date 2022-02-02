import express, {Request, Response} from "express";
import {read, write} from "./ymlController";

export const router = express.Router();

router.get("/", (req: Request, res: Response) => {
    res.render("index", {data: read()});
});

router.get("/admin", (req: Request, res: Response) => {
    console.log(read());
    res.render("admin", {data: read()});
});

router.post("/api/save", (req: Request, res: Response) => {
    write(req.body);
    res.redirect("/admin");
});