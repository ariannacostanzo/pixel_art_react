import { createContext, useContext } from "react";
import { useGrid } from './GridContext.jsx';
import useStorage from "../hooks/useStorage.js";

const ColorContext = createContext();

const ColorProvider = ({ children }) => {

    const { setCellColors , cellColors} = useGrid();
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

  return (
    <ColorContext.Provider
      value={{
        currentColor,
        setCurrentColor,
        choseColor,
        colorCell,
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
