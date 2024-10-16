import { createContext, useContext, useEffect, useState } from "react";
import { useGrid } from "./GridContext.jsx";
import useStorage from "../hooks/useStorage.js";

const ColorContext = createContext();

const ColorProvider = ({ children }) => {
  const { setCellColors, cellColors, totalCells } = useGrid();
  //logica colore
  const [currentColor, setCurrentColor] = useStorage(
    "#FFFFFF",
    "selectedColor"
  );
  const [mode, setMode] = useStorage("color", 'mode');

  const choseColor = (e) => {
    setCurrentColor(e.target.value);
    setMode("color");
  };

  const choseErasor = () => {
    setMode("erase");
  };

  const handleColoring = (i) => {
    setCellColors((prev) => {
      console.log(cellColors);
      const newColors = [...prev];
      if (mode === "color") {
        newColors[i] = currentColor;
      } else {
        newColors[i] = "#FFFFFF";
      }
      return newColors;
    });
  };

  const clearCells = () => {
    setCellColors(Array(totalCells).fill("#FFFFFF"));
  };

  useEffect(() => {
    console.log("La modalità è cambiata:", mode);
  }, [mode]);

  return (
    <ColorContext.Provider
      value={{
        currentColor,
        setCurrentColor,
        choseColor,
        clearCells,
        handleColoring,
        choseErasor,
        mode
      }}
    >
      {children}
    </ColorContext.Provider>
  );
};

const useColor = () => {
  const value = useContext(ColorContext);
  return value;
};

// eslint-disable-next-line react-refresh/only-export-components
export { ColorProvider, useColor };
