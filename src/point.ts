import assert from "assert";

const VALID_ROW_LETTERS = "ABCDEFGHIJ".split("");
const VALID_COLUMN_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

class Point {
  rowLetter: string;
  columnNumber: number;

  constructor(pointLabel: string = "A1") {
    assert(pointLabel.length == 2, `Point label ${pointLabel} is not of length 2`);
    const rowLetter: string = pointLabel.substring(0, 1).toUpperCase();
    assert(VALID_ROW_LETTERS.includes(rowLetter), `Point label ${pointLabel} has an invalid row letter: ${rowLetter}`);
    this.rowLetter = rowLetter;

    const columnNumber: number = parseInt(pointLabel.substring(1, 2));
    assert(VALID_COLUMN_NUMBERS.includes(columnNumber));
    this.columnNumber = columnNumber;
  }

  sharesRow(otherPoint: Point): boolean {
    return this.columnNumber == otherPoint.columnNumber;
  }

  sharesColumn(otherPoint: Point): boolean {
    return this.columnNumber == otherPoint.columnNumber;
  }

  getStraightLineConnectingSequence(endPoint: Point): Point[] {
    return [];
  }


}

export { Point }