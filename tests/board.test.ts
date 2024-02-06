import { describe, expect, test } from '@jest/globals';
import { Board } from '../src/board';
import { Piece } from '../src/piece';
import { Point } from '../src/point';

describe("Board remaining pieces", () => {
  test("Empty board has 4 left pieces to place", () => {
    const board = new Board();
    const remaining: number[] = board.pieceSizesRemainingToPlace();
    expect(remaining.length).toEqual(4);
  });


  test("Board with 1 piece on it has 3 pieces left to place", () => {
    const board = new Board();
    board.addPiece("H4", "H6");

    const remaining: number[] = board.pieceSizesRemainingToPlace();
    expect(remaining.length).toEqual(3);
  });

  test("Board with 2 piece on it has 2 pieces left to place", () => {
    const board = new Board();
    board.addPiece("H4", "H6");
    board.addPiece("A4", "A8");

    const remaining: number[] = board.pieceSizesRemainingToPlace();
    expect(remaining.length).toEqual(2);
  });

  test("Board with 4 pieces on it has no pieces left to place", () => {
    const board = new Board();
    board.addPiece("A1", "A3");
    board.addPiece("B1", "B3");
    board.addPiece("C1", "C4");
    board.addPiece("D1", "D5");

    const remaining: number[] = board.pieceSizesRemainingToPlace();
    expect(remaining.length).toEqual(0);
  });

})

describe("Board piece placement", () => {
  test("Can place 2 pieces of size 3", () => {
    const board = new Board();
    board.addPiece("H4", "H6");
    board.addPiece("A4", "A6");

    const placedPieceSizes: number[] = board.placedPieceSizes();
    expect(placedPieceSizes.length).toEqual(2);
    expect(placedPieceSizes).toEqual([3, 3]);
  });

  test("Can place required 4 pieces", () => {
    const board = new Board();
    board.addPiece("A1", "A3");
    board.addPiece("B1", "B3");
    board.addPiece("C1", "C4");
    board.addPiece("D1", "D5");

    const placedPieceSizes: number[] = board.placedPieceSizes();
    expect(placedPieceSizes.length).toEqual(4);
    expect(placedPieceSizes).toEqual([3, 3, 4, 5]);
  });

  test("Can not place 5 pieces", () => {
    const board = new Board();
    board.addPiece("A1", "A3");
    board.addPiece("B1", "B3");
    board.addPiece("C1", "C4");
    board.addPiece("D1", "D5");

    expect(() => {
      board.addPiece("E4", "E7");
    }).toThrow();
  });

  test("Can not place intersecting pieces", () => {
    const board = new Board();
    board.addPiece("A3", "E3");

    expect(() => {
      board.addPiece("D1", "D5");
    }).toThrow();
  });

})

describe("Board ", () => {
  
})