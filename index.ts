import express, { Express, Request, Response } from "express";

import { board } from "./src/board";

console.log("board: ", board);

const port = 3000;
const hostname = "0.0.0.0"

const app: Express = express()

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.get("/board", (req: Request, res: Response) => {
  res.send(board);
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});