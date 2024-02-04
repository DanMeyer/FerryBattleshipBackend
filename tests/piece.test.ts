import { describe, expect, test } from '@jest/globals';
import { Piece } from '../src/piece';
import { Point } from '../src/point';

describe("Single piece tests", () => {

  test("3 length piece", () => {
    const p1 = new Point("H4");
    const p2 = new Point("H6");
    const piece = new Piece(p1, p2);

    expect(piece.length()).toEqual(3);
  });

  test("4 length piece", () => {
    const p1 = new Point("F4");
    const p2 = new Point("F7");
    const piece = new Piece(p1, p2);

    expect(piece.length()).toEqual(4);
  });

  test("5 length piece", () => {
    const p1 = new Point("D4");
    const p2 = new Point("D8");
    const piece = new Piece(p1, p2);

    expect(piece.length()).toEqual(5);
  });


  test("too short piece", () => {
    const p1 = new Point("D4");
    const p2 = new Point("D5");

    expect(() => {
      const piece = new Piece(p1, p2);
    }).toThrow();
  });

  test("too long piece", () => {
    const p1 = new Point("D1");
    const p2 = new Point("D8");

    expect(() => {
      const piece = new Piece(p1, p2);
    }).toThrow();
  });

});

describe("Piece overlap", () => {
  test("Simple overlap", () => {
    const p1 = new Point("C4");
    const p2 = new Point("C6");
    const piece1 = new Piece(p1, p2);

    const p3 = new Point("C5");
    const p4 = new Point("C8");
    const piece2 = new Piece(p3, p4);

    expect(piece1.overlaps(piece2)).toEqual(true)
  });

  test("Overlap works both ways", () => {
    const p1 = new Point("C4");
    const p2 = new Point("C6");
    const piece1 = new Piece(p1, p2);

    const p3 = new Point("C5");
    const p4 = new Point("C8");
    const piece2 = new Piece(p3, p4);

    expect(piece1.overlaps(piece2)).toEqual(true)
    expect(piece2.overlaps(piece1)).toEqual(true)
  });

  test("No overlap", () => {
    const p1 = new Point("A4");
    const p2 = new Point("A6");
    const piece1 = new Piece(p1, p2);

    const p3 = new Point("C4");
    const p4 = new Point("C7");
    const piece2 = new Piece(p3, p4);

    expect(piece1.overlaps(piece2)).toEqual(false)
  });

});