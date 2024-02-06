import express, { Express, Request, Response, NextFunction } from "express";
import { Game } from "./src/game";

import { Point } from "./src/point";

const port = 3000;
const hostname = "0.0.0.0"

const app: Express = express()

let game = new Game();

// Using GET + query params for easier testing
// POST + body params would be the better choice

app.get("/checkValidPoint", (req: Request, res: Response) => {
  const pointLabel: string = (typeof req.query.point === "string") ? req.query.point : "";
  const point = new Point(pointLabel);
  res.send(point);
});

app.get("/reset", (req: Request, res: Response) => {
  game = new Game();
});

app.get("/place", (req: Request, res: Response) => {
  const start: string = (typeof req.query.start === "string") ? req.query.start : "";
  const end: string = (typeof req.query.end === "string") ? req.query.end : "";
  game.placePiece(start, end);
  res.send(true);
});

app.get("/attack", (req: Request, res: Response) => {
  const point: string = (typeof req.query.point === "string") ? req.query.point : "";
  const data = game.attackAndReply(point);
  res.send(data);
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(400).send({ message: err.message });
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});