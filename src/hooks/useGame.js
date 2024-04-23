import { useState } from "react";
import api from "../api/axiosConfig.js";

// my custom hook
const useGame = (userToken) => {
  const [turn, setTurn] = useState(0);
  const [currentGuess, setCurrentGuess] = useState("");
  const [oldGuesses, setOldGuesses] = useState([...Array(6)]); // guesses - arrays
  const [isWinner, setIsWinner] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);
  const [usedLetters, setUsedLetters] = useState({});
  const [solution, setSolution] = useState("");
  const [error, setError] = useState(null);

  // format guess into array of letter objects
  const evaluateGuess = (guessMap) => {
    let evaluatedGuess = [...currentGuess].map((letter) => {
      return { key: letter, state: "ABSENT" };
    });

    evaluatedGuess.forEach((letter, i) => {
      if (guessMap[i] === "CORRECT") {
        evaluatedGuess[i].state = "CORRECT";
      } else if (guessMap[i] === "PRESENT") {
        evaluatedGuess[i].state = "PRESENT";
      }
    });

    return evaluatedGuess;
  };

  const submitGuess = async () => {
    try {
      const response = await api.post("/submitGuess", null, {
        params: {
          userToken,
          guess: currentGuess,
        },
      });
      console.log(response.data);
      if (response.data.status !== "INVALID") {
        const letterState = response.data.letterState;
        guessAccepted(response, evaluateGuess(letterState));
      } else {
        setIsInvalid(true);
      }
      setError(null);
    } catch (err) {
      console.log(err);
      setError(err.toJSON());
    }
  };

  const guessAccepted = (response, evaluatedGuess) => {
    setSolution(response.data.solution);
    if (response.data.status === "WIN") {
      setIsWinner(true);
    }
    setOldGuesses((oldGuesses) => {
      let newGuesses = [...oldGuesses];
      newGuesses[turn] = evaluatedGuess;
      return newGuesses;
    });
    setTurn(response.data.turn);
    setUsedLetters((oldUsedLetters) => {
      let newUsedLetters = { ...oldUsedLetters };
      evaluatedGuess.forEach((letter) => {
        const currentColour = newUsedLetters[letter.key];
        if (letter.state === "CORRECT") {
          newUsedLetters[letter.key] = "CORRECT";
          return;
        }
        if (letter.state === "PRESENT" && currentColour !== "CORRECT") {
          newUsedLetters[letter.key] = "PRESENT";
          return;
        }
        if (letter.state === "ABSENT" && !currentColour) {
          newUsedLetters[letter.key] = "ABSENT";
          return;
        }
      });
      return newUsedLetters;
    });

    setCurrentGuess("");
  };

  const handleKeyUp = ({ key }) => {
    handleKey(key);
  };

  function handleKey(key) {
    setIsInvalid(false);
    // submit guess
    if (key === "Enter") {
      submitGuess();
    }
    // delete letter
    if (key === "Backspace") {
      setCurrentGuess((old) => {
        return old.slice(0, -1);
      });
      return;
    }
    // only allow letters as input
    if (/^[A-Za-z]$/.test(key)) {
      if (currentGuess.length < 5) {
        setCurrentGuess((old) => {
          return old + key;
        });
      }
    }
  }

  // hook allows access to from outside:
  return {
    turn,
    currentGuess,
    oldGuesses,
    isWinner,
    isInvalid,
    usedLetters,
    solution,
    error,
    handleKeyUp,
    handleKey,
  };
};

export default useGame;
