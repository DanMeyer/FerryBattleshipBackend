import { describe, expect, test } from '@jest/globals';
import { Piece } from '../src/piece';
import { Point } from '../src/point';

describe("Single piece tests", () => {

  test("3 length piece", () => {
    const piece = new Piece("H4", "H6");
    expect(piece.length()).toEqual(3);
  });

  test("4 length piece", () => {
    const piece = new Piece("F4", "F7");
    expect(piece.length()).toEqual(4);
  });

  test("5 length piece", () => {
    const piece = new Piece("D4", "D8");
    expect(piece.length()).toEqual(5);
  });


  test("too short piece", () => {
    expect(() => {
      new Piece("D4", "D5");
    }).toThrow();
  });

  test("too long piece", () => {
    expect(() => {
      new Piece("D1", "D8");
    }).toThrow();
  });

});

describe("Piece overlap", () => {
  test("Simple overlap", () => {
    const piece1 = new Piece("C4", "C6");
    const piece2 = new Piece("C5", "C8");

    expect(piece1.overlaps(piece2)).toEqual(true)
  });

  test("Overlap works both ways", () => {
    const piece1 = new Piece("C4", "C6");
    const piece2 = new Piece("C5", "C8");

    expect(piece1.overlaps(piece2)).toEqual(true)
    expect(piece2.overlaps(piece1)).toEqual(true)
  });

  test("No overlap", () => {
    const piece1 = new Piece("A4", "A6");
    const piece2 = new Piece("C4", "C7");

    expect(piece1.overlaps(piece2)).toEqual(false)
  });

});

describe("Piece attacking", () => {
  test("sink", () => {
    const piece = new Piece("C4", "C6");
    piece.attack("C4");
    piece.attack("C5");
    piece.attack("C6");
    expect(piece.isSunk()).toEqual(true);
  });

  test("not sunk yet", () => {
    const piece = new Piece("C4", "C6");
    piece.attack("C4");
    piece.attack("C5");
    expect(piece.numHits()).toEqual(2);
    expect(piece.isSunk()).toEqual(false);
  });

  test("miss", () => {
    const piece = new Piece("C4", "C6");
    piece.attack("D1");
    expect(piece.numHits()).toEqual(0);
    expect(piece.isSunk()).toEqual(false);
  });

  test("can not attack same spot twice", () => {
    const piece = new Piece("C4", "C6");
    piece.attack("C4");

    expect(() => {
      piece.attack("C4");
    }).toThrow();
  });

});