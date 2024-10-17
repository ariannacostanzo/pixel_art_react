/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import "./grid.scss";
import { useGrid } from "../../providers/GridContext.jsx";
import { useColor } from "../../providers/ColorContext.jsx";

const Grid = () => {
  const {
    cellDimension,
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
          gridTemplateColumns: `repeat(${gridWidth}, ${cellDimension}px)`,
          gridTemplateRows: `repeat(${gridHeight}, ${cellDimension}px)`,
          width: `calc(${gridWidth} * ${cellDimension}px)`,
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
              width: `${cellDimension}px`,
              height: `${cellDimension}px`,
              backgroundColor: cellColors[i],
            }}
          ></div>
        ))}
      </main>
      
    </>
  );
};
export default Grid;
