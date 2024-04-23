import React, { useEffect, useState } from "react";
// main custom hook
import useGame from "../hooks/useGame";
import Board from "./Board";
import MyKeyboard from "./MyKeyboard";
import Modal from "./Modal";

function Game({ userToken }) {
  const {
    currentGuess,
    handleKeyUp,
    handleKey,
    oldGuesses,
    isWinner,
    isInvalid,
    turn,
    usedLetters,
    solution,
  } = useGame(userToken);

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    window.addEventListener("keyup", handleKeyUp);

    if (isWinner || turn > 5) {
      setTimeout(() => {
        setShowModal(true);
      }, 2500);
      window.removeEventListener("keyup", handleKeyUp);
    }

    // detach event listener
    return () => window.removeEventListener("keyup", handleKeyUp);
  }, [handleKeyUp, isWinner, turn]);

  return (
    <>
      <Board
        currentGuess={currentGuess}
        oldGuesses={oldGuesses}
        turn={turn}
        isWinner={isWinner}
        isInvalid={isInvalid}
      />
      <MyKeyboard usedLetters={usedLetters} handleKey={handleKey} />
      {showModal && (
        <Modal isWinner={isWinner} turn={turn} solution={solution} />
      )}
    </>
  );
}

export default Game;
