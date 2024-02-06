import assert from 'assert';
import { ALL_VALID_POINT_LABELS } from './point';
import { Board } from './board';

const BOARD_SCRIPTS = [
  [
    ["A1", "A3"],
    ["B1", "B3"],
    ["C1", "C4"],
    ["D1", "D5"],
  ],

  [
    ["B4", "B6"],
    ["C5", "F5"],
    ["D6", "D10"],
    ["I4", "I6"],
  ],

];

class Computer {
  attacks: string[];

  constructor() {
    this.attacks = ALL_VALID_POINT_LABELS.slice().sort(() => .5 - Math.random());
  }

  nextAttack(): string {
    const attack = this.attacks.pop();
    if (attack) {
      return attack;
    } else {
      assert(false, "game should be won if computer attacks all points");
    }
  }

  static buildRandomBoard() {
    const i = Math.floor(Math.random() * BOARD_SCRIPTS.length);
    return Computer.buildSeededBoard(i);
  }

  static buildSeededBoard(i: number) {
    const boardScript = BOARD_SCRIPTS[i];
    const board = new Board();
    for (const [start, end] of boardScript) {
      board.addPiece(start, end);
    }
    return board;
  }
}

export { Computer }