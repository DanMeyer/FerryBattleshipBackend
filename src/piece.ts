import assert from "assert";
import { Point } from "./point";

const VALID_PIECE_LENGTHS: number[] = [3, 4, 5];

class Piece {
  points: Point[];
  hitPoints: Point[];

  constructor(start: string, end: string) {
    const startPoint: Point = new Point(start);
    const endPoint: Point = new Point(end);

    const points = startPoint.getStraightLineConnectingSequence(endPoint);

    assert(VALID_PIECE_LENGTHS.includes(points.length),
      `Piece must be of size ${VALID_PIECE_LENGTHS}. This one would be ${points.length}`
    )

    this.points = points;

    this.hitPoints = [];
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

  attack(pointLabel: string): boolean {
    const attackPoint = new Point(pointLabel);
    if (this.wouldHit(attackPoint)) {
      this.addHit(attackPoint);
      return true;
    }
    return false;
  }

  wouldHit(attackPoint: Point): boolean {
    for (const point of this.points) {
      if (attackPoint.equals(point)) {
        return true;
      }
    }
    return false;
  }

  addHit(candidateHitPoint: Point) {
    for (const hitPoint of this.hitPoints) {
      if (candidateHitPoint.equals(hitPoint)) {
        assert(false, "Can not attack the same spot twice")
      }
    }
    this.hitPoints.push(candidateHitPoint);
  }

  isSunk(): boolean {
    return this.hitPoints.length >= this.points.length;
  }

  numHits(): number {
    return this.hitPoints.length;
  }
}

export { Piece }