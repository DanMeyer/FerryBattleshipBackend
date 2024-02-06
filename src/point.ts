import assert from "assert";

const VALID_ROW_LETTERS = "ABCDEFGHIJ".split("");
const VALID_COLUMN_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

class Point {
  pointLabel: string;
  rowLetter: string;
  columnNumber: number;

  constructor(pointLabel: string) {
    assert(pointLabel.length == 2, `Point label ${pointLabel} is not of length 2`);
    const rowLetter: string = pointLabel.substring(0, 1).toUpperCase();
    assert(VALID_ROW_LETTERS.includes(rowLetter), `Point label ${pointLabel} has an invalid row letter: ${rowLetter}`);
    this.rowLetter = rowLetter;

    const columnNumber: number = parseInt(pointLabel.substring(1, 2));
    assert(VALID_COLUMN_NUMBERS.includes(columnNumber));
    this.columnNumber = columnNumber;

    this.pointLabel = pointLabel;
  }

  equals(p: Point): boolean {
    return this.pointLabel == p.pointLabel;
  }

  sharesRow(p: Point): boolean {
    return this.rowLetter == p.rowLetter;
  }

  sharesColumn(p: Point): boolean {
    return this.columnNumber == p.columnNumber;
  }

  sharesRowOrColumn(p: Point) {
    return (this.sharesRow(p) || this.sharesColumn(p));
  }

  getStraightLineConnectingSequence(p: Point): Point[] {
    if (this == p) {
      return [new Point(this.pointLabel)];
    }


    if (this.sharesRow(p)) {
      const minColumnNumber: number = Math.min(this.columnNumber, p.columnNumber);
      const maxColumnNumber: number = Math.max(this.columnNumber, p.columnNumber);

      const points: Point[] = [];
      for (let i = minColumnNumber; i <= maxColumnNumber; i++) {
        points.push(new Point(this.rowLetter + i));
      }
      return points;
    }

    else if (this.sharesColumn(p)) {
      const rowLetterIndexThis: number = VALID_ROW_LETTERS.indexOf(this.rowLetter);
      const rowLetterIndexP: number = VALID_ROW_LETTERS.indexOf(p.rowLetter);

      const minRowLetterIndex: number = Math.min(rowLetterIndexThis, rowLetterIndexP);
      const maxRowLetterIndex: number = Math.max(rowLetterIndexThis, rowLetterIndexP);

      const points: Point[] = [];
      for (let i = minRowLetterIndex; i <= maxRowLetterIndex; i++) {
        points.push(new Point(VALID_ROW_LETTERS[i] + this.columnNumber));
      }
      return points;
    }

    assert(false, "Piece must lie horizontal or vertical, never diagonal");
  }


}

export { Point }