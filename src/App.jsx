import Player from "./components/Playes";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import GameOver from "./components/GameOver";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import { useState } from "react";

const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2'
};
const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns) {
  let currentPlayer = 'X';
  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O';
  }
  return currentPlayer;
}

function deriveGameBoard(gameTurns) {
  let gameBoard = [...INITIAL_GAME_BOARD.map(array => [...array])];
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const {row, col} = square;

    gameBoard [row][col] = player;
  }
  return gameBoard;
}


function deriveWinner(gameBoard, players) {
  let winner = null;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSqr = gameBoard[combination[0].row][combination[0].column];
    const secSqr = gameBoard[combination[1].row][combination[1].column];
    const thirdtSqr = gameBoard[combination[2].row][combination[2].column];
    if (firstSqr && firstSqr === secSqr && firstSqr === thirdtSqr) {
      winner = players[firstSqr];
    }
  }
  return winner;
}



function App() {
  const [players, setPlayers] = useState(PLAYERS)
  const [gameTurns, setGameTurns] = useState([]);
  const gameBoard = deriveGameBoard(gameTurns);
  const activePlayer = deriveActivePlayer(gameTurns);
  const winner = deriveWinner(gameBoard, players);


  const hasDraw = gameTurns.length === 9 && !winner
  function handleActivePlayer(rowIndex, colIndex) {
    setGameTurns(prevTurn => {
      const currentPlayer = deriveActivePlayer(prevTurn);
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer }, 
        ...prevTurn,
      ];
      return updatedTurns;
    });
  }
  


  function handleRestart() {
    setGameTurns([]);
  }

  function handlePlayerName(symble, newName) {
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symble]: newName
      }
    });
  }
  return (

    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initalName={PLAYERS.X} symble="X" isActive={activePlayer === 'X'} onChangeName={handlePlayerName} />
          <Player initalName={PLAYERS.O} symble="O" isActive={activePlayer === 'O'} onChangeName={handlePlayerName} />

        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart} />}
        <GameBoard onSelectSqr={handleActivePlayer} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  )
}

export default App
