import express, { Express, Request, Response, NextFunction } from "express";

import { Point } from "./src/point";

const port = 3000;
const hostname = "0.0.0.0"

const app: Express = express()

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.get("/checkValidPoint", (req: Request, res: Response) => {
  const pointLabel: string = (typeof req.query.point === "string") ? req.query.point : "";
  console.log("pointLabel", pointLabel);
  const point = new Point(pointLabel);
  res.send(point);
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(400).send({ message: err.message });
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});