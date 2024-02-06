import { describe, expect, test } from '@jest/globals';
import exp from 'constants';
import { Board } from '../src/board';
import { Computer } from '../src/computer';
import { Point } from '../src/point';

describe("Computer board", () => {
  test("Seed 0 is valid board", () => {
    const board = Computer.buildSeededBoard(0);
    const remaining: number[] = board.pieceSizesRemainingToPlace();
    expect(remaining.length).toEqual(0);
  });

  test("Seed 1 is valid board", () => {
    const board = Computer.buildSeededBoard(1);
    const remaining: number[] = board.pieceSizesRemainingToPlace();
    expect(remaining.length).toEqual(0);
  });



})

describe("Computer attacks", () => {
  test("Computer has 100 attacks prepared", () => {
    const computer = new Computer();
    for (let i = 0; i < 100; i++) {
      const attack = computer.nextAttack();
    }
    
    expect(() => {
      computer.nextAttack();
    }).toThrow();
  });

});