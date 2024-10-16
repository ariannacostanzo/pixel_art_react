import { useEffect } from "react";
import "./grid.scss";
import { useGrid } from "../../providers/GridContext.jsx";
import { useColor } from "../../providers/ColorContext.jsx";

const Grid = () => {
  const {
    cellWidth,
    cellHeight,
    numberOfCells,
    calculateCells,
    cellColors,
  } = useGrid();
  const { handleColoring, handleMouseDown, handleMouseUp, mode } = useColor();

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
      <main
        onMouseDown={handleMouseDown} //disegno quando premo
        onMouseUp={handleMouseUp} //disattivo il disegno quando smetto di cliccare
        style={{
          cursor:
            mode === "color"
              ? "url('/brush.png') 16 16, auto"
              : "url('/eraser.png')16 16, auto",
          // display: "grid",
          // gridTemplateColumns: `repeat(auto-fill, minmax(${cellWidth}px, 1fr))`,
          // gridTemplateRows: `repeat(auto-fill, minmax(${cellHeight}px, 1fr))`,
        }}
      >
        {numberOfCells.map((_, i) => (
          <div
            key={`cell${i}`}
            onMouseOver={() => {
              handleColoring(i);
            }}
            className="cell"
            style={{
              width: `${cellWidth}px`,
              height: `${cellHeight}px`,
              backgroundColor: cellColors[i],
            }}
          ></div>
        ))}
      </main>
    </>
  );
};
export default Grid;
