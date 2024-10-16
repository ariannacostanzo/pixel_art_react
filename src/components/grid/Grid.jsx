import { useEffect, useState } from "react";
import "./grid.scss";

const Grid = () => {
  const [cellWidth, setCellWidth] = useState(40);
  const [cellHeight, setCellHeight] = useState(40);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);
  const [numberOfCells, setNumberOfCells] = useState([]);

  //controllo il cambio della finestra
  const handleResize = () => {
    setScreenWidth(window.innerWidth);
    setScreenHeight(window.innerHeight);
    calculateCells();
  };

  //calcolo il numero di celle
  const calculateCells = () => {
    const columns = Math.floor(screenWidth / cellWidth);
    const rows = Math.floor(screenHeight / cellHeight);
    const totalCells = columns * rows;

    setNumberOfCells(Array.from({ length: totalCells }));
  };

  //aggiorno continuamente i valori dello spazio a mia disposizione per la griglia
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [screenWidth, screenHeight, cellWidth, cellHeight]);

  useEffect(() => {
    calculateCells();
  }, []);

  return (
    <>
      <main>
        {numberOfCells.map((_, i) => (
          <div
            key={`cell${i}`}
            className="cell"
            style={{
              width: `${cellWidth}px`,
              height: `${cellHeight}px`,
              border: "1px solid black",
            }}
          ></div>
        ))}
      </main>
    </>
  );
};
export default Grid;
