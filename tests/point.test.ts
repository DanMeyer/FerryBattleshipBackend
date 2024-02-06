import { describe, expect, test } from '@jest/globals';
import { Point } from '../src/point';

describe("Single Point tests", () => {
  test("Valid point", () => {
    const p = new Point("A4");
    expect(p).toBeDefined();
  });

  test("Valid point lower case", () => {
    const p = new Point("b7");
    expect(p).toBeDefined();
  });

  test("Invalid row", () => {
    expect(() => {
      const p = new Point("M4");
    }).toThrow();
  });

  test("Invalid zero column", () => {
    expect(() => {
      const p = new Point("C0");
    }).toThrow();
  });

  test("Valid 10 column", () => {
    expect(() => {
      const p = new Point("C10");
    }).not.toThrow();
  });

  test("Invalid length", () => {
    expect(() => {
      const p = new Point("D23");
    }).toThrow();
  });

});

describe("Point comparison tests", () => {
  test("Point equality", () => {
    const p1 = new Point("A4");
    const p2 = new Point("A4");
    expect(p1.equals(p2)).toEqual(true);
  });

  test("Points share row", () => {
    const p1 = new Point("A4");
    const p2 = new Point("A5");
    expect(p1.sharesRow(p2)).toEqual(true);
    expect(p1.sharesColumn(p2)).toEqual(false);
  });

  test("Points share column", () => {
    const p1 = new Point("A4");
    const p2 = new Point("B4");
    expect(p1.sharesRow(p2)).toEqual(false);
    expect(p1.sharesColumn(p2)).toEqual(true);
  });

});

describe("Connecting point tests", () => {
  test("same point", () => {
    const p1: Point = new Point("C7");
    const p2: Point = new Point("C7");
    const points: Point[] = p1.getStraightLineConnectingSequence(p2);
    expect(points.length).toEqual(1);
  });

  test("2 point row", () => {
    const p1: Point = new Point("A4");
    const p2: Point = new Point("A5");
    const points: Point[] = p1.getStraightLineConnectingSequence(p2);
    expect(points.length).toEqual(2);
  });

  test("4 point row", () => {
    const p1: Point = new Point("A2");
    const p2: Point = new Point("A5");
    const points: Point[] = p1.getStraightLineConnectingSequence(p2);
    expect(points.length).toEqual(4);
  });

  test("3 point column", () => {
    const p1: Point = new Point("B1");
    const p2: Point = new Point("B3");
    const points: Point[] = p1.getStraightLineConnectingSequence(p2);
    expect(points.length).toEqual(3);
  });

  test("3 point column reverse order", () => {
    const p1: Point = new Point("B3");
    const p2: Point = new Point("B1");
    const points: Point[] = p1.getStraightLineConnectingSequence(p2);
    expect(points.length).toEqual(3);
  });

  test("diagonal", () => {
    const p1: Point = new Point("A4");
    const p2: Point = new Point("C7");
    expect(() => {
      const points: Point[] = p1.getStraightLineConnectingSequence(p2);
    }).toThrow();
  });

});