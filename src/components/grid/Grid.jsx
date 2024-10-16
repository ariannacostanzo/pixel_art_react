import { useEffect } from "react";
import "./grid.scss";
import { useGrid } from "../../providers/GridContext.jsx";
import { useColor } from "../../providers/ColorContext.jsx";

const Grid = () => {
  const {
    handleResize,
    screenWidth,
    screenHeight,
    cellWidth,
    cellHeight,
    numberOfCells,
    calculateCells,
    cellColors,
  } = useGrid();
  const { colorCell } = useColor();

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
            onClick={() => {
              colorCell(i);
            }}
            className="cell"
            style={{
              width: `${cellWidth}px`,
              height: `${cellHeight}px`,
              border: "1px solid black",
              backgroundColor: cellColors[i],
            }}
          ></div>
        ))}
      </main>
    </>
  );
};
export default Grid;
