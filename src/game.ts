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
    this.assertGameIsNotOver();
    this.assertPlayerCanAttack();

    const playerDidHit = this.computerBoard.attack(point);
    
    if (this.computerBoard.allShipsSunk()) {
      return {
        "playerDidHit": true,
        "computerAttack": null,
        "playerHasWon": true,
        "computerHasWon": false,
      }
    }

    const computerAttack = this.computer.nextAttack();
    this.playerBoard.attack(computerAttack);
    return {
      "playerDidHit": playerDidHit,
      "computerAttack": computerAttack,
      "playerHasWon": false,
      "computerHasWon": this.computerHasWon(),
    }
  }

  assertGameIsNotOver() {
    assert(!this.playerHasWon() && !this.computerHasWon(), "Game is over");
  }

  playerHasWon() {
    return this.computerBoard.allShipsSunk();
  }

  computerHasWon() {
    return this.playerBoard.allShipsSunk();
  }
}

export { Game }