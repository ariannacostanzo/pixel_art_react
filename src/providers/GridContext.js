import { createContext, useContext, useState } from "react";

const GridContext = createContext();

const GridProvider = ({ children }) => {
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
    <GridContext.Provider
      value={{
        cellWidth,
        setCellWidth,
        cellHeight,
        setCellHeight,
        screenWidth,
        setScreenWidth,
        screenHeight,
        setScreenHeight,
        numberOfCells,
        setNumberOfCells,
        cellColors,
        setCellColors,
        handleResize,
        calculateCells,
      }}
    >
      {children}
    </GridContext.Provider>
  );
};

const useGrid = () => {
  const value = useContext(GridContext);
  return value;
};

export { GridProvider, useGrid };