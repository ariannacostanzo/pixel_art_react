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
  const [cellColors, setCellColors] = useStorage([], 'cellColors')
  

  //controllo il cambio della finestra
  //forse da eliminare
  // const handleResize = () => {
  //   setScreenWidth(window.innerWidth);
  //   setScreenHeight(window.innerHeight);
  //   calculateCells();
  // };

  //calcolo il numero di celle
  const calculateCells = () => {
    const columns = Math.floor(screenWidth / cellWidth);
    const rows = Math.floor(screenHeight / cellHeight);
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
        screenWidth,
        setScreenWidth,
        screenHeight,
        setScreenHeight,
        numberOfCells,
        setNumberOfCells,
        cellColors,
        setCellColors,
        calculateCells,
        saveGridAsImage
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