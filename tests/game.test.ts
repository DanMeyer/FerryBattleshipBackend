import { describe, expect, test } from '@jest/globals';
import exp from 'constants';
import { Board } from '../src/board';
import { Piece } from '../src/piece';
import { Game } from '../src/game';

describe("Game", () => {
  test("Player can attack no pieces placed", () => {
    const game = new Game();
  });
  
  test("Player can not attack if only 3 pieces placed", () => {
  });

});