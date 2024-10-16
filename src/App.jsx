import { useState } from "react";
import Grid from "./components/grid/Grid";
import Header from "./components/header/Header";
import { GridProvider } from "./providers/GridContext";
import { ColorProvider } from "./providers/ColorContext";

function App() {
  //logica colore
  const [currentColor, setCurrentColor] = useState("#FFFFFF");

  const choseColor = (e) => {
    setCurrentColor(e.target.value);
  };

  const colorCell = (i) => {
    console.log(currentColor, i)
    setCellColors((prev) => {
      const newColors = [...prev];
      newColors[i] = currentColor;
      return newColors;
    })
  }

  //logica creazione grid
  const [cellWidth, setCellWidth] = useState(40);
  const [cellHeight, setCellHeight] = useState(40);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);
  const [numberOfCells, setNumberOfCells] = useState([]);
  const [cellColors, setCellColors] = useState([]);

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
    setCellColors((prevColors) => {
      const newColors = [...prevColors];

      if (newColors.length < totalCells) {
        newColors.length = totalCells; 
        newColors.fill("#FFFFFF", prevColors.length); 
      } else {
        newColors.length = totalCells;
      }
      return newColors;
    });
  };

  return (
    <>
      <GridProvider>
        <ColorProvider>
          <Header currentColor={currentColor} choseColor={choseColor}></Header>

          <Grid
            handleResize={handleResize}
            screenWidth={screenWidth}
            screenHeight={screenHeight}
            cellWidth={cellWidth}
            cellHeight={cellHeight}
            numberOfCells={numberOfCells}
            calculateCells={calculateCells}
            colorCell={colorCell}
            cellColors={cellColors}
          ></Grid>
        </ColorProvider>
      </GridProvider>
    </>
  );
}

export default App;
