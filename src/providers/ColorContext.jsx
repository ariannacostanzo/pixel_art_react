/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import { useGrid } from "./GridContext.jsx";
import useStorage from "../hooks/useStorage.js";

const ColorContext = createContext();

const ColorProvider = ({ children }) => {
  const { setCellColors } = useGrid();

  //logica colore
  const [currentColor, setCurrentColor] = useStorage(
    "#000000",
    "selectedColor"
  );
  const [mode, setMode] = useStorage("color", "mode");
  const [isMouseDown, setIsMouseDown] = useState(false);

  const choseColor = (e) => {
    setCurrentColor(e.target.value);
    setMode("color");
  };

  const chosePen = () => {
    setMode("color");
  };

  const choseErasor = () => {
    setMode("erase");
  };

  //sto tenendo promuto il mouse
  const handleMouseDown = (e) => {
    // Se l'elemento cliccato è un input, non fare nulla
    if (
      e.target.tagName.toLowerCase() === "input" ||
      e.target.tagName.toLowerCase() === "textarea"
    ) {
      return;
    }
    
    e.preventDefault();
    setIsMouseDown(true);
  };

  //non sto tenendo premuto
  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  //coloro
  const handleColoring = (i) => {
    setCellColors((prev) => {
      const newColors = [...prev];
      if (mode === "color") {
        newColors[i] = currentColor;
      } else {
        newColors[i] = "#FFFFFF";
      }
      return newColors;
    });
  };

  //tengo conto di quando smetto di tenere premuto il mouse
  useEffect(() => {
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  //tengo conto di quando tengo premuto il mouse
  useEffect(() => {
    window.addEventListener("mousedown", handleMouseDown);

    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);


  return (
    <ColorContext.Provider
      value={{
        currentColor,
        setCurrentColor,
        choseColor,
        handleColoring,
        choseErasor,
        mode,
        chosePen,
        isMouseDown,
        setIsMouseDown,
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
