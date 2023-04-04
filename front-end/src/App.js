import "./App.css";
import { useState } from "react";
import Board from "./Board";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [game, setGame] = useState({
    height: 10,
    width: 10,
    mines: 12,
  });
  return (
    <>
      <Board height={game.height} width={game.width} mines={game.mines} />
    </>
  );
}

export default App;
