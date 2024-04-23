import React from "react";

function Row({ oldGuess, currentGuess, isInvalid, isWinner }) {
  if (oldGuess) {
    return (
      <div className={`${isWinner ? "row winner" : "row"}`}>
        {oldGuess.map((letter, i) => (
          <div
            key={i}
            className={letter.state}
            style={{ "--animation-order": i }}
          >
            {letter.key}
          </div>
        ))}
      </div>
    );
  }

  if (currentGuess) {
    let letters = currentGuess.split("");

    return (
      <div className={isInvalid ? "row active invalid" : "row active"}>
        {letters.map((letter, i) => (
          <div key={i} className="tile filled">
            {letter}
          </div>
        ))}
        {[...Array(5 - letters.length)].map((empty, i) => (
          <div key={i} className="tile"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="row">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

export default Row;
