import assert from 'assert';
import { Board } from "./board";
import { Computer } from "./computer";

class Game {
  playerBoard: Board;
  computerBoard: Board;
  computer: Computer;
  
  constructor() {
    this.playerBoard = new Board();
    this.computerBoard = Computer.buildRandomBoard();
    this.computer = new Computer();
  }

  placePiece(start: string, end: string) {
    this.playerBoard.addPiece(start, end);
  }

  assertPlayerCanAttack() {
    const numPlayerPiecesRemainingToPlace = this.playerBoard.pieceSizesRemainingToPlace().length;
    assert(numPlayerPiecesRemainingToPlace == 0, `Player still needs to place ${numPlayerPiecesRemainingToPlace} pieces`);
  }

  attackAndReply(point: string) {
    this.assertPlayerCanAttack();

    this.computerBoard.attack(point);
    if (!this.computerBoard.allShipsSunk()) {
      this.playerBoard.attack(this.computer.nextAttack());
    }
  }

  playerHasWon() {
    return this.computerBoard.allShipsSunk();
  }

  computerHasWon() {
    return this.playerBoard.allShipsSunk();
  }
}