import { describe, expect, test } from '@jest/globals';
import { Board } from '../src/board';
import { Piece } from '../src/piece';
import { Point } from '../src/point';

describe("Board", () => {
  test("Empty board has 4 left pieces to place", () => {
    const b = new Board();
    const remaining: number[] = b.pieceSizesRemainingToPlace();
    expect(remaining.length).toEqual(4);
  });


  test("Board with one piece on it has 3 left pieces to place", () => {
    const board = new Board();
    const point1 = new Point("H4");
    const point2 = new Point("H6");
    const piece = new Piece(point1, point2);

    board.addPiece(piece);
    const remaining: number[] = board.pieceSizesRemainingToPlace();
    expect(remaining.length).toEqual(3);
  });

})