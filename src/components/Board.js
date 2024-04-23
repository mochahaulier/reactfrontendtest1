import React from "react";
import Row from "./Row";

const Board = ({ currentGuess, oldGuesses, turn, isInvalid, isWinner }) => {
  return (
    <div className="board">
      {oldGuesses.map((guess, i) => {
        if (turn === i) {
          return (
            <Row key={i} currentGuess={currentGuess} isInvalid={isInvalid} />
          );
        }
        return (
          <Row key={i} oldGuess={guess} isWinner={isWinner && turn - 1 === i} />
        );
      })}
    </div>
  );
};

export default Board;
