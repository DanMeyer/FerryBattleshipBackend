import { describe, expect, test } from '@jest/globals';
import { Game } from '../src/game';

describe("Game", () => {
  test("Player can not attack if no pieces have placed", () => {
    const game = new Game();
    game.placePiece("G1", "G4");

    expect(() => {
      game.attackAndReply("F4");
    }).toThrow();
  });
  
  test("Player can attack if 4 pieces placed", () => {
    const game = new Game();
    game.placePiece("G1", "G3");
    game.placePiece("H2", "H4");
    game.placePiece("I2", "I5");
    game.placePiece("A1", "A5");

    expect(() => {
      game.attackAndReply("F4");
    }).not.toThrow();
  });

  /*
    TODO: figure out a testing strategy for deeper into the game
  */

});