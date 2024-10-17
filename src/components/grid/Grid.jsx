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
    gridWidth,
    gridHeight,
  } = useGrid();
  const { handleColoring, handleMouseDown, handleMouseUp, mode } = useColor();

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
          display: "grid",
          gridTemplateColumns: `repeat(${gridWidth}, ${cellWidth}px)`,
          gridTemplateRows: `repeat(${gridHeight}, ${cellHeight}px)`,
          width: `calc(${gridWidth} * ${cellWidth}px)`,
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
              // flexBasis: `calc(${gridWidth}px / ${cellWidth}px)`
            }}
          ></div>
        ))}
      </main>
    </>
  );
};
export default Grid;
