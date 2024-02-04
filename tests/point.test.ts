import { describe, expect, test } from '@jest/globals';
import { Point } from '../src/point';

describe("Point", () => {
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

  test("Invalid column", () => {
    expect(() => {
      const p = new Point("C0");
    }).toThrow();
  });

  test("Invalid length", () => {
    expect(() => {
      const p = new Point("D23");
    }).toThrow();

  });

  test("Point equality", () => {
    const p1 = new Point("A4");
    const p2 = new Point("A4");
    expect(p1).toEqual(p2);
  });

})