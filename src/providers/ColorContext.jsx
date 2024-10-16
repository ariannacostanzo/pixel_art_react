import { createContext, useContext } from "react";
import { useGrid } from './GridContext.jsx';
import useStorage from "../hooks/useStorage.js";

const ColorContext = createContext();

const ColorProvider = ({ children }) => {

    const { setCellColors , cellColors, totalCells} = useGrid();
  //logica colore
  const [currentColor, setCurrentColor] = useStorage("#FFFFFF", 'selectedColor');

  const choseColor = (e) => {
    setCurrentColor(e.target.value);
  };

  const colorCell = (i) => {
    setCellColors((prev) => {
      console.log(cellColors)
      const newColors = [...prev];
      newColors[i] = currentColor;
      return newColors;
    });

  };

  const clearCells = () => {
    setCellColors(Array(totalCells).fill('#FFFFFF'))
  }

  return (
    <ColorContext.Provider
      value={{
        currentColor,
        setCurrentColor,
        choseColor,
        colorCell,
        clearCells
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

export { ColorProvider, useColor };
