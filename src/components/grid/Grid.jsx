/* eslint-disable react-hooks/exhaustive-deps */
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
  const { handleColoring, mode, isMouseDown} = useColor();

  useEffect(() => {
    calculateCells();
  
  }, []);


  return (
    <>
      <main
        style={{
          cursor:
            mode === "color"
              ? "url('/brush.png') 3 32, auto"
              : "url('/eraser.png')3 32, auto",
          display: "grid",
          gridTemplateColumns: `repeat(${gridWidth}, ${cellWidth}px)`,
          gridTemplateRows: `repeat(${gridHeight}, ${cellHeight}px)`,
          width: `calc(${gridWidth} * ${cellWidth}px)`,
        }}
      >
        {numberOfCells.map((_, i) => (
          <div
            key={`cell${i}`}
            //se sto premendo coloro in hover
            onMouseOver={() => {
              if (isMouseDown) {
                handleColoring(i);
              }
            }}
            //coloro al click
            onClick={() => {
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
