# To run
 (After `npm install`)
 - `tsx index.ts`
 - visit http://localhost:3000

# To run tests
  - `jest`

# To re-run test coverage
  - `jest --coverage`

# To play
Start
 - Start the server

Placement phase
 - Place 4 pieces. For example: `/place?start=A1&end=A4`

Attack phase
 - Attack via `/attack?point=A4`
 - Computer will retaliate automatically.
 - Keep attacking until there is a winner.

Reset
 - At any time, start a new game via `/reset`