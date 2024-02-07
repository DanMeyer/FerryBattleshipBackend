const VALID_ROW_LETTERS = "ABCDEFGHIJ".split("");
const VALID_COLUMN_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const ALL_VALID_POINT_LABELS: string[] = [];
for (const validRowLetter of VALID_ROW_LETTERS) {
  for (const validColumnNumber of VALID_COLUMN_NUMBERS) {
    ALL_VALID_POINT_LABELS.push(validRowLetter + validColumnNumber);
  }
}

export { ALL_VALID_POINT_LABELS, VALID_ROW_LETTERS }