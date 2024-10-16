import { useEffect } from "react";
import "./grid.scss";
import { useGrid } from "../../providers/GridContext.jsx";
import { useColor } from "../../providers/ColorContext.jsx";

const Grid = () => {
  const {
    screenWidth,
    screenHeight,
    cellWidth,
    cellHeight,
    numberOfCells,
    calculateCells,
    cellColors,
    setCellColors,
    totalCells
  } = useGrid();
  const { colorCell } = useColor();

  //aggiorno continuamente i valori dello spazio a mia disposizione per la griglia
//   useEffect(() => {
//     window.addEventListener("resize", handleResize);
//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, [screenWidth, screenHeight, cellWidth, cellHeight]);

  useEffect(() => {
    calculateCells();
  }, []);

//modificare le celle, fare in modo che attraverso degli scaglioni ci sia un certo
//numero fisso di celle, altrimenti i colori sono sempre sovrascritti

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
