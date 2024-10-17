/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useEffect, useState } from "react";

const GridContext = createContext();

const GridProvider = ({ children }) => {
  //logica creazione grid
  const [cellWidth, setCellWidth] = useState(30);  //era 40
  const [cellHeight, setCellHeight] = useState(30);
  const [gridWidth, setGridWidth] = useState(40);
  const [gridHeight, setGridHeight] = useState(23);
  const [tempGridWidth, setTempGridWidth] = useState(gridWidth);
  const [tempGridHeight, setTempGridHeight] = useState(gridHeight);
  const [numberOfCells, setNumberOfCells] = useState([]);
  const [cellColors, setCellColors] = useState([])
  

  //controllo il cambio della finestra

  //aggiorno al cambio
  useEffect(() => {
    handleResize();
  }, [gridWidth, gridHeight])

  const handleResize = () => {
    console.log('funziona?')
    console.log(tempGridWidth);
    clearCells();
    setGridWidth(tempGridWidth);
    setGridHeight(tempGridHeight);
    calculateCells();
    
  };

  const clearCells = () => {
    const totalCells = numberOfCells.length;
    setCellColors(Array(totalCells).fill("#FFFFFF"));
  };

  //cambio le dimensioni della griglia a scelta dell'utente

  const choseGridWidth = (e) => {
    const value = parseInt(e.target.value, 10);
    console.log(value)
   if (value >= 5 && value <= 120) {
     setTempGridWidth(value);
   } else if (value > 100) {
     setTempGridWidth(100); 
   }
  }
  
  const choseGridHeight = (e) => {
    const value = parseInt(e.target.value, 10);
    console.log(value);
    if (value >= 5 && value <= 60) {
      setTempGridHeight(value);
    } else if (value > 50) {
      setTempGridHeight(50); 
    }
  }


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

    canvas.width = totalColumns * cellWidth;
    canvas.height = totalRows * cellHeight;

    //disegno tutte le celle nel canvas
    numberOfCells.forEach((_, i) => {
      const color = cellColors[i] || "#FFFFFF"; 
      const x = (i % totalColumns) * cellWidth;
      const y = Math.floor(i / totalColumns) * cellHeight;

      // Disegno la cella sul canvas
      context.fillStyle = color;
      context.fillRect(x, y, cellWidth, cellHeight);
    });

    const image = canvas.toDataURL("image/png");

    // Creo un link per scaricare l'immagine
    const link = document.createElement("a");
    link.href = image;
    link.download = "grid-drawing.png"; // Nome del file salvato
    document.body.appendChild(link); 
    link.click(); 
    document.body.removeChild(link); 
  }
  

  return (
    <GridContext.Provider
      value={{
        cellWidth,
        setCellWidth,
        cellHeight,
        setCellHeight,
        gridWidth,
        gridHeight,
        numberOfCells,
        setNumberOfCells,
        cellColors,
        setCellColors,
        calculateCells,
        saveGridAsImage,
        choseGridHeight,
        choseGridWidth,
        handleResize,
        clearCells
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