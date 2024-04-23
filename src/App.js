import "./App.css";
import { useEffect, useState } from "react";
// my components
import Game from "./components/Game";
import api from "./api/axiosConfig";
import Error from "./components/Error";

function App() {
  const [userToken, setUserToken] = useState(null);
  const [error, setError] = useState(null);

  const getUserToken = async () => {
    try {
      const response = await api.get("/newGame");
      setUserToken(response.data);
      setError(null);
    } catch (err) {
      setError(err.toJSON());
      console.log(err);
    }
  };

  // starts the game on the server and gets userToken
  useEffect(() => {
    getUserToken();
  }, []);

  return (
    <div className="app">
      {/* Show Game component if we have a userToken*/}
      {userToken && <Game userToken={userToken} />}
      {error && <Error error={error} />}
    </div>
  );
}

export default App;
