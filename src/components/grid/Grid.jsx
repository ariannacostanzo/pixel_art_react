import { useEffect, useState } from "react";
import "./grid.scss";

const Grid = ({handleResize, screenWidth, screenHeight, cellWidth, cellHeight, numberOfCells, calculateCells}) => {
  

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
