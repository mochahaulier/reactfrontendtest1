import React from "react";

function Modal({ isWinner, turn, solution }) {
  const winningStatements = [
    "GENIUS",
    "MAGNIFICENT",
    "IMPRESSIVE",
    "SPLENDID",
    "GREAT",
    "PHEW",
    "OH :/",
  ];
  return (
    <div
      className="modal"
      data-state={turn < 4 ? "green" : isWinner ? "yellow" : "grey"}
    >
      <div>
        <h1>{winningStatements[turn]}</h1>
        <p>{isWinner ? "YOU FOUND THE WORD" : "YOU DIDN'T FIND THE WORD"}</p>
        <h2 className="solution">{solution}</h2>
        <p>
          WITHIN {turn} {turn > 1 ? "GUESSES" : "GUESS"}!
        </p>
      </div>
    </div>
  );
}

export default Modal;
