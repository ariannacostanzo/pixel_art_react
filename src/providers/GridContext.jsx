/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useEffect, useState } from "react";

const GridContext = createContext();

const GridProvider = ({ children }) => {
  //logica creazione grid
  const [cellDimension, setCellDimension] = useState(30); //era 40
  const [tempCellDimension, setTempCellDimension] = useState(cellDimension);
  const [gridWidth, setGridWidth] = useState(40);
  const [gridHeight, setGridHeight] = useState(23);
  const [tempGridWidth, setTempGridWidth] = useState(gridWidth);
  const [tempGridHeight, setTempGridHeight] = useState(gridHeight);
  const [numberOfCells, setNumberOfCells] = useState([]);
  const [cellColors, setCellColors] = useState([]);
  const min = 5;
  const max = 100;

  //controllo il cambio della finestra

  //aggiorno al cambio
  useEffect(() => {
    handleResize();
  }, [gridWidth, gridHeight]);

  const handleResize = () => {
    clearCells();
    setGridWidth(tempGridWidth);
    setGridHeight(tempGridHeight);
    setCellDimension(tempCellDimension);
    calculateCells();
  };

  const clearCells = () => {
    const totalCells = numberOfCells.length;
    setCellColors(Array(totalCells).fill("#FFFFFF"));
  };

  //cambio le dimensioni della griglia a scelta dell'utente
  const choseCellDimension = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value >= min && value <= max) {
      setTempCellDimension(value);
    } else if (value > max) {
      setTempCellDimension(max);
    }
  };

  const choseGridWidth = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value >= min && value <= max) {
      setTempGridWidth(value);
    } else if (value > max) {
      setTempGridWidth(max);
    }
  };

  const choseGridHeight = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value >= min && value <= max) {
      setTempGridHeight(value);
    } else if (value > max) {
      setTempGridHeight(max);
    }
  };

  //calcolo il numero di celle
  const calculateCells = () => {
    const columns = gridHeight;
    const rows = gridWidth;
    const totalCells = columns * rows;

    setNumberOfCells(Array.from({ length: totalCells }));
    setCellColors((prevColors) => {
      const newColors = [...prevColors];

      // Se ci sono meno colori di celle, aggiungo celle con colore di default
      if (newColors.length < totalCells) {
        newColors.length = totalCells;
        newColors.fill("#FFFFFF", prevColors.length);
      } else if (newColors.length > totalCells) {
        // Se ci sono più colori del numero di celle, rimuovo i colori in eccesso
        newColors.length = totalCells;
      }

      return newColors;
    });
  };

  //salvare il disegno
  const saveGridAsImage = () => {
    //creo un canvas
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    //ottengo le dimensioni della grigia
    
    const totalColumns = gridWidth;
    const totalRows = gridHeight;

    canvas.width = window.innerWidth;
    canvas.height = totalRows * cellDimension;

    //disegno tutte le celle nel canvas
    numberOfCells.forEach((_, i) => {
      const color = cellColors[i] || "#FFFFFF";
      const x = (i % totalColumns) * cellDimension;
      const y = Math.floor(i / totalColumns) * cellDimension;

      // Disegno la cella sul canvas
      context.fillStyle = color;
      context.fillRect(x, y, cellDimension, cellDimension);
    });

    const image = canvas.toDataURL("image/png");

    // Creo un link per scaricare l'immagine
    const link = document.createElement("a");
    link.href = image;
    link.download = "grid-drawing.png"; // Nome del file salvato
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <GridContext.Provider
      value={{
        cellDimension,
        gridWidth,
        gridHeight,
        numberOfCells,
        cellColors,
        calculateCells,
        saveGridAsImage,
        choseGridHeight,
        choseGridWidth,
        handleResize,
        clearCells,
        choseCellDimension,
        min,
        max,
        setCellColors
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

// eslint-disable-next-line react-refresh/only-export-components
export { GridProvider, useGrid };
