import { createContext, useContext, useEffect, useState } from "react";
import { useGrid } from "./GridContext.jsx";
import useStorage from "../hooks/useStorage.js";

const ColorContext = createContext();

const ColorProvider = ({ children }) => {
  const { setCellColors } = useGrid();

  //logica colore
  const [currentColor, setCurrentColor] = useStorage(
    "#FFFFFF",
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
  }

  const choseErasor = () => {
    setMode("erase");
  };

  //sto tenendo promuto il mouse
  const handleMouseDown = (e) => {
    e.preventDefault(); 
    setIsMouseDown(true);
  };

  //non sto tenendo premuto
  const handleMouseUp = () => {
    setIsMouseDown(false)
  }
  

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

  

   useEffect(() => {

     window.addEventListener("mouseup", handleMouseUp);

     return () => {
       window.removeEventListener("mouseup", handleMouseUp);
     };
   }, []);
   
   useEffect(() => {

     window.addEventListener("mousedown", handleMouseDown);

     return () => {
       window.removeEventListener("mousedown", handleMouseDown);
     };
   }, []);

  useEffect(() => {
    // console.log("La modalità è cambiata:", mode);
  }, [mode]);

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
        setIsMouseDown
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
