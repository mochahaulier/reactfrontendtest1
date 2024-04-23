import React from "react";
import { MdKeyboardBackspace, MdKeyboardReturn } from "react-icons/md";
import { IconContext } from "react-icons";

function MyKeyboard({ usedLetters, handleKey }) {
  const topKeys = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"];
  const middleKeys = ["a", "s", "d", "f", "g", "h", "j", "k", "l"];
  const bottomKeys = ["z", "x", "c", "v", "b", "n", "m"];

  return (
    <div className="mykeyboard">
      <div className="myrow">
        {topKeys.map((letter) => {
          const state = usedLetters[letter];
          return (
            <div
              className={state}
              key={letter}
              onClick={() => handleKey(letter)}
            >
              {letter}
            </div>
          );
        })}
      </div>
      <div className="myrow">
        {middleKeys.map((letter) => {
          const state = usedLetters[letter];
          return (
            <div
              className={state}
              key={letter}
              onClick={() => handleKey(letter)}
            >
              {letter}
            </div>
          );
        })}
      </div>
      <div className="myrow">
        <div key="Enter" className="icon" onClick={() => handleKey("Enter")}>
          <IconContext.Provider value={{ className: "react-icons" }}>
            <MdKeyboardReturn />
          </IconContext.Provider>
        </div>

        {bottomKeys.map((letter) => {
          const state = usedLetters[letter];
          return (
            <div
              className={state}
              key={letter}
              onClick={() => handleKey(letter)}
            >
              {letter}
            </div>
          );
        })}

        <div
          key="Backspace"
          className="icon"
          onClick={() => handleKey("Backspace")}
        >
          <IconContext.Provider value={{ className: "react-icons" }}>
            <MdKeyboardBackspace />
          </IconContext.Provider>
        </div>
      </div>
    </div>
  );
}

export default MyKeyboard;
