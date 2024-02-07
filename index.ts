import express, { Express, Request, Response, NextFunction } from "express";
import { Game } from "./src/game";

import { Point } from "./src/point";

const port = 3000;
const hostname = "0.0.0.0"

const app: Express = express()

/*
Initialize a Game. Note that /reset just updates this variable with a new instance
*/
let game = new Game();

/****
Endpoints for user actions.

# GET
I chose to use GET with query params for easier testing, e.g. you can just use the browser.

We should *not* use GET for mutation like this. Using POST + body params would be a much better choice (and would be any easy modification to make)


# Return values
These endpoints do *not* follow a standard pattern, e.g. a JSON message that looks something like:
{
  success: True,
  message: "",
  errors: "",
  gameStateSummary: "Player has won"
}

But they should. Probably best for the endpoints to assemble that, rather than the classes.

# Board state
The return value on most actions could include more game state information.

We should probably also have endpoints that allow the client to query for additional game state and game history information.

# End-to-end testing
I 

****/


app.get("/", (req: Request, res: Response) => {
  res.send("Battleship!");
});

/*
Example:
/checkValidPoint?point=A1
*/
app.get("/checkValidPoint", (req: Request, res: Response) => {
  const pointLabel: string = (typeof req.query.point === "string") ? req.query.point : "";
  const point = new Point(pointLabel);
  res.send(point);
});

/*
Example:
/reset
*/
app.get("/reset", (req: Request, res: Response) => {
  game = new Game();
  res.send("Reset");
});

/*
Example:
/place?start=A1&end=A4
*/
app.get("/place", (req: Request, res: Response) => {
  const start: string = (typeof req.query.start === "string") ? req.query.start : "";
  const end: string = (typeof req.query.end === "string") ? req.query.end : "";
  game.placePiece(start, end);
  res.send(true);
});

/*
Example:
/attack?point=A4
*/
app.get("/attack", (req: Request, res: Response) => {
  const point: string = (typeof req.query.point === "string") ? req.query.point : "";
  const data = game.attackAndReply(point);
  res.send(data);
});


/****
Install error middleware, in order to catch and display assertions from the game classes.

but for purposes of this exercise I chose to handle
validation

This is not how we'd want to do this in production. We'd probably want proper Express/HTTP input validation *and* validation at the class level.

Options for internal validation include:
 - throwing lots of custom exceptions e.g. "PieceTooLargeException"
 - modifying return types of most functions to include an error value, a la Go
 - using a validation library like Zod (https://github.com/colinhacks/zod)
****/


app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(400).send({ message: err.message });
});


/****
Start the server
****/

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});