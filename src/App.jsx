import { useState } from "react";
import Grid from "./components/grid/Grid";
import Header from "./components/header/Header";

function App() {
  //logica colore
  const [currentColor, setCurrentColor] = useState("#FFFFFF");

  const choseColor = (e) => {
    setCurrentColor(e.target.value);
  };

  //logica creazione grid
  const [cellWidth, setCellWidth] = useState(40);
  const [cellHeight, setCellHeight] = useState(40);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);
  const [numberOfCells, setNumberOfCells] = useState([]);

  //controllo il cambio della finestra
  const handleResize = () => {
    setScreenWidth(window.innerWidth);
    setScreenHeight(window.innerHeight);
    calculateCells();
  };

  //calcolo il numero di celle
  const calculateCells = () => {
    const columns = Math.floor(screenWidth / cellWidth);
    const rows = Math.floor(screenHeight / cellHeight);
    const totalCells = columns * rows;

    setNumberOfCells(Array.from({ length: totalCells }));
  };

  return (
    <>
      <Header currentColor={currentColor} choseColor={choseColor}></Header>
      <Grid
        handleResize={handleResize}
        screenWidth={screenWidth}
        screenHeight={screenHeight}
        cellWidth={cellWidth}
        cellHeight={cellHeight}
        numberOfCells={numberOfCells}
        calculateCells={calculateCells}
      ></Grid>
    </>
  );
}

export default App;
