import assert from "assert";
import { Point } from "./point";

const VALID_PIECE_LENGTHS: number[] = [3, 4, 5];

class Piece {
  points: Point[];

  constructor(startPoint: Point, endPoint: Point) {
    const points = startPoint.getStraightLineConnectingSequence(endPoint);
    assert(VALID_PIECE_LENGTHS.includes(points.length),
      `Piece must be of size ${VALID_PIECE_LENGTHS}. This one would be ${points.length}`
    )
    this.points = points;
  }

  length() {
    return this.points.length;
  }

  overlaps(p: Piece) {
    for (const p1 of this.points) {
      for (const p2 of p.points) {
        if (p1.equals(p2)) {
          return true;
        }
      }
    }
    return false;
  }
}

export { Piece }