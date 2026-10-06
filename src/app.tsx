import { useState } from 'react';

type Player = 'X' | 'O';
type Cell = Player | null;
type Board = [Cell, Cell, Cell, Cell, Cell, Cell, Cell, Cell, Cell];

const winningLines: ReadonlyArray<readonly [number, number, number]> = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

const squareIds = [
  'square-1',
  'square-2',
  'square-3',
  'square-4',
  'square-5',
  'square-6',
  'square-7',
  'square-8',
  'square-9'
] as const;

function createEmptyBoard(): Board {
  return Array.from({ length: 9 }, (): Cell => null) as Board;
}

function findWinningLine(board: Board) {
  return winningLines.find(([first, second, third]) => {
    const mark = board[first];
    return mark !== null && mark === board[second] && mark === board[third];
  });
}

function getStatus(winner: Player | null, isDraw: boolean, currentPlayer: Player) {
  if (winner) {
    return `Player ${winner} wins!`;
  }
  if (isDraw) {
    return "It's a draw.";
  }
  return `Player ${currentPlayer}'s turn`;
}

export default function App() {
  const [board, setBoard] = useState<Board>(createEmptyBoard);
  const winningLine = findWinningLine(board);
  const winner = winningLine ? (board[winningLine[0]] ?? null) : null;
  const isDraw = !winner && board.every((cell) => cell !== null);
  const moveCount = board.filter((cell) => cell !== null).length;
  const currentPlayer: Player = moveCount % 2 === 0 ? 'X' : 'O';
  const isGameOver = Boolean(winner) || isDraw;

  function playAt(index: number) {
    if (isGameOver || board[index] !== null) {
      return;
    }

    const nextBoard = [...board] as Board;
    nextBoard[index] = currentPlayer;
    setBoard(nextBoard);
  }

  function resetGame() {
    setBoard(createEmptyBoard());
  }

  const status = getStatus(winner, isDraw, currentPlayer);

  return (
    <main className='game-page'>
      <section className='game-card' aria-labelledby='game-title'>
        <div className='game-heading'>
          <p className='eyebrow'>THE CLASSIC GAME</p>
          <h1 id='game-title'>Tic Tac Toe</h1>
          <p className='game-subtitle'>A little friendly competition.</p>
        </div>

        <div
          className={`game-status${isGameOver ? 'game-status--finished' : ''}`}
          aria-live='polite'
        >
          <span
            className={`player-mark player-mark--${winner ?? currentPlayer}`}
            aria-hidden='true'
          >
            {winner ?? (isDraw ? '•' : currentPlayer)}
          </span>
          <span>{status}</span>
        </div>

        <div className='game-board' role='group' aria-label='Tic tac toe board'>
          {board.map((cell, index) => {
            const isWinningCell = winningLine?.includes(index) ?? false;
            const squareLabel = `Square ${index + 1}`;
            const cellLabel = cell ? `${squareLabel}, ${cell}` : `${squareLabel}, empty`;
            const cellClasses = ['game-cell'];

            if (cell) {
              cellClasses.push(`game-cell--${cell.toLowerCase()}`);
            }
            if (isWinningCell) {
              cellClasses.push('game-cell--winner');
            }

            return (
              <button
                aria-label={cellLabel}
                aria-pressed={cell !== null}
                className={cellClasses.join(' ')}
                disabled={cell !== null || isGameOver}
                key={squareIds[index]}
                onClick={() => {
                  playAt(index);
                }}
                type='button'
              >
                {cell && <span className='game-mark'>{cell}</span>}
              </button>
            );
          })}
        </div>

        <div className='game-footer'>
          <span className='player-legend'>
            <span className='legend-mark legend-mark--x'>X</span> goes first
          </span>
          <button className='reset-button' onClick={resetGame} type='button'>
            New game <span aria-hidden='true'>↻</span>
          </button>
          <span className='player-legend'>
            <span className='legend-mark legend-mark--o'>O</span> goes second
          </span>
        </div>
      </section>
      <p className='page-note'>Pass the screen and take turns.</p>
    </main>
  );
}
