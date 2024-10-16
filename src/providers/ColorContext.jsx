import { createContext, useContext, useState } from "react";
import { useGrid } from './GridContext.jsx';

const ColorContext = createContext();

const ColorProvider = ({ children }) => {

    const { setCellColors } = useGrid();
  //logica colore
  const [currentColor, setCurrentColor] = useState("#FFFFFF");

  const choseColor = (e) => {
    setCurrentColor(e.target.value);
  };

  const colorCell = (i) => {
    console.log(currentColor, i);
    setCellColors((prev) => {
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
