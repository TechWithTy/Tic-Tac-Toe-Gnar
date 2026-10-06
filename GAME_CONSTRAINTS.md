# Big Tic Tac Toe: Game Constraints

## Required behavior

- The game is for two local players sharing one screen.
- The board is a 3 × 3 grid. Players alternate X then O, with X taking the first turn.
- A move can only fill an empty square while the game is active.
- Three matching marks in a row, column, or diagonal end the round and identify the winner.
- If all nine squares are filled without a winner, the round ends in a draw.
- A finished round rejects further moves. Starting a new game clears the board and restores X as the first player.
- Game progress is held only in browser memory. Reloading the page starts a fresh round; no game data is saved or sent to a server.

## Product and interface constraints

- React with TypeScript; keep game state in the client because no backend or persistence is required.
- Provide visible turn and end-of-round status, and make the new-game action available throughout the round.
- Keep the board usable on narrow screens and make each square operable by keyboard with an accessible label and focus state.
- Avoid external services, accounts, analytics, and multiplayer networking for this brief.

## Current assumptions

- “New game” immediately clears the current round, including an unfinished one.
- There is no score tracking between rounds. A new game starts a single fresh round.
- Resetting or refreshing does not ask for confirmation.

## Game-state question

Should the app track wins and draws across rounds until the page is refreshed, or should every new game simply begin with a clean board and no score? Also, should starting a new game during an unfinished round ask for confirmation?
