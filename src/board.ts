import assert from "assert";
import { Piece } from './piece'

const REQUIRED_PIECE_SIZES = [3, 3, 4, 5].sort();

class Board {
  pieces: Piece[];

  constructor() {
    this.pieces = [];
  }

  placedPieceSizes(): number[] {
    return this.pieces.map(piece => piece.length()).sort();
  }

  cloneOfRequiredPieceSizeCounts(): Map<number, number> {
    const requiredPieceSizeCounts: Map<number, number> = new Map();
    for (const pieceSize of REQUIRED_PIECE_SIZES) {
      const oldCount: number = requiredPieceSizeCounts.get(pieceSize) || 0;
      requiredPieceSizeCounts.set(
        pieceSize,
        oldCount + 1
      )
    }
    return requiredPieceSizeCounts;
  }

  pieceSizesRemainingToPlace(): number[] {
    const remainingPieceSizeCounts: Map<number, number> = this.cloneOfRequiredPieceSizeCounts();
    const placedPieceSizes = this.placedPieceSizes();

    for (const pieceSize of placedPieceSizes) {
      const oldCount: number = remainingPieceSizeCounts.get(pieceSize) || 0;
      assert(oldCount > 0, "Discovered an invalid piece state on the board")
      remainingPieceSizeCounts.set(
        pieceSize,
        oldCount - 1
      )
    }

    const sizesRemaining: number[] = [];
    for (let [size, count] of remainingPieceSizeCounts.entries()) {
      while (count > 0) {
        sizesRemaining.push(size);
        count--;
      }
    }

    return sizesRemaining.sort();
  }

  overlapsExistingPieces(piece: Piece): boolean {
    for (const existingPiece of this.pieces) {
      if (piece.overlaps(existingPiece)) {
        return true;
      }
    }
    return false;
  }

  addPiece(piece: Piece) {
    const validPieceSizes = this.pieceSizesRemainingToPlace();
    assert(
      validPieceSizes.includes(piece.length()),
      `Cannot add a piece of size ${piece.length} to this board`
    )

    assert(
      !this.overlapsExistingPieces(piece),
      "Cannot add a piece that overlaps with an existing piece"
    )

    this.pieces.push(piece);
  }

}

export { Board }