import { createContext, useContext, useEffect, useState } from "react";
import useStorage from "../hooks/useStorage";

const GridContext = createContext();

const GridProvider = ({ children }) => {
  //logica creazione grid
  const [cellWidth, setCellWidth] = useState(30);  //era 40
  const [cellHeight, setCellHeight] = useState(30);
  const [gridWidth, setGridWidth] = useState(10);
  const [gridHeight, setGridHeight] = useState(10);
  const [tempGridWidth, setTempGridWidth] = useState(gridWidth);
  const [tempGridHeight, setTempGridHeight] = useState(gridHeight);
  const [numberOfCells, setNumberOfCells] = useStorage([], "numberOfCells");
  const [cellColors, setCellColors] = useStorage([], 'cellColors')
  

  //controllo il cambio della finestra

  //aggiorno al cambio
  useEffect(() => {
    handleResize();
  }, [gridWidth, gridHeight])

  const handleResize = () => {
    setGridWidth(tempGridWidth);
    setGridHeight(tempGridHeight);
    calculateCells();
  };

  //cambio le dimensioni della griglia a scelta dell'utente

  const choseGridWidth = (e) => {
    if (e.target.value < 5 || e.target.value > 47) return
    setTempGridWidth(e.target.value)
  }
  const choseGridHeight = (e) => {
    if (e.target.value < 5 || e.target.value > 19) return;
    setTempGridHeight(e.target.value)
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
    const gridWidth = Math.sqrt(numberOfCells.length);
    canvas.width = gridWidth * cellWidth;
    canvas.height = gridWidth * cellHeight;

    //disegno tutte le celle nel canvas
    numberOfCells.forEach((_, i) => {
      const color = cellColors[i] || "#FFFFFF"; 
      const x = (i % gridWidth) * cellWidth;
      const y = Math.floor(i / gridWidth) * cellHeight;

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
        handleResize
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