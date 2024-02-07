import React, { useState } from 'react';


// eslint-disable-next-line react/prop-types
function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Popup({ winner, onClose, onRestart }) {
  return (
    <div className="popup">
      <div className="popup-content">
        <p>Winner: {winner}</p>
        <button onClick={onClose}>Close</button>
        <button onClick={onRestart}>Restart Game</button>
      </div>
    </div>
  );
}



export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
 
  function handleClick(i) {
    if (squares[i] || winner) return;

    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';

    setSquares(nextSquares);
    setXIsNext(!xIsNext);

    const calculatedWinner = calculateWinner(nextSquares);
    if (calculatedWinner) {
      setWinner(calculatedWinner);
      setShowPopup(true);
    }
  }

  function handleRestartGame() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setWinner(null);
    setShowPopup(false);
  }

  function handleClosePopup() {
    setShowPopup(false);
  }

  let status = winner ? `Winner: ${winner}` : `Next player: ${xIsNext ? 'X' : 'O'}`;

  return (
    <>
    <div className='ticTittle'> Tic-Tac-Toe Multiplayer </div>
      <div className="board">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
      <div className="status">{status}</div>
      {showPopup && (
        <Popup winner={winner} onClose={handleClosePopup} onRestart={handleRestartGame} />
      )}
    </>
  );
}

function calculateWinner(squares){
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return false;
}

