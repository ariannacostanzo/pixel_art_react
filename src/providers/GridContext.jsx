import { createContext, useContext, useState } from "react";
import useStorage from "../hooks/useStorage";

const GridContext = createContext();

const GridProvider = ({ children }) => {
  //logica creazione grid
  const [cellWidth, setCellWidth] = useState(40);
  const [cellHeight, setCellHeight] = useState(40);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);
  const [numberOfCells, setNumberOfCells] = useStorage([], "numberOfCells");
  // const [cellColors, setCellColors] = useStorage(() => {
  //   const itemValue = localStorage.getItem("cellColors");
  //   // Se non ci sono colori salvati, ritorna un array di bianchi di lunghezza numberOfCells
  //   if (!itemValue) {
  //     return new Array(numberOfCells.length).fill("#FFFFFF");
  //   } else {
  //     return JSON.parse(itemValue)
  //   }
  // }, "cellColors");
  const [cellColors, setCellColors] = useStorage(["FFFFFF"], 'cellColors')

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
      // Se prevColors ha già il numero corretto di celle, ritorna quello
      if (prevColors.length === totalCells) {
        return prevColors;
      }

      // Altrimenti, ritorna un nuovo array pieno di #FFFFFF
      return new Array(totalCells).fill("#FFFFFF");
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