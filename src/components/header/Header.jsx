import "./header.scss";
import { useColor } from "../../providers/ColorContext.jsx";
import { useGrid } from "../../providers/GridContext.jsx";
import { faEraser } from "@fortawesome/free-solid-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Tooltip from "../tooltip/Tooltip.jsx";
import InputNumber from "../inputNumber/InputNumber.jsx";
const Header = () => {
  const { choseColor, currentColor, choseErasor, mode, chosePen } = useColor();
  const {
    saveGridAsImage,
    choseGridWidth,
    choseGridHeight,
    handleResize,
    clearCells,
  } = useGrid();

  return (
    <>
      <header>
        <h1 className="text-4xl uppercase font-bold">Pixel Art</h1>
        {/* cambia dimensioni griglia  */}
        <div className="flex items-center gap-4 shrink-0 mx-4">
          <div className="text-end">
            <div>
              <InputNumber
                id="gridWidth"
                lab="Larghezza griglia"
                func={choseGridWidth}
                min="5"
                max="100"
                placeholder="40"
              ></InputNumber>
            </div>
            <div className="mt-2">
              <InputNumber
                id="gridHeight"
                lab="Altezza griglia"
                func={choseGridHeight}
                min="5"
                max="50"
                placeholder="23"
              ></InputNumber>
            </div>
          </div>
          <div onClick={handleResize}>
            <Tooltip
              icon={faPlus}
              text="Genera griglia"
              chosen="ignore"
            ></Tooltip>
          </div>
        </div>
        {/* cambia dimensioni cella  */}
        <div>
          
        </div>
        <div className="flex gap-4 items-center shrink-0">
          {/* salva  */}
          <div onClick={saveGridAsImage}>
            <Tooltip icon={faSave} text="Salva png" chosen="ignore"></Tooltip>
          </div>
          {/* svuota celle  */}
          <div onClick={clearCells} className="cursor-pointer">
            <Tooltip
              icon={faTrashCan}
              text="Svuota la griglia"
              chosen="ignore"
            ></Tooltip>
          </div>
          {/* modalità  */}
          <div className="px-4">
            Modalità:{" "}
            <span className="text-[#1e211d] font-bold uppercase">
              {mode === "color" ? "Colora" : "Cancella"}
            </span>
          </div>

          {/* cancella una cella  */}
          <div onClick={choseErasor}>
            <Tooltip
              icon={faEraser}
              text="cancella"
              chosen={mode === "color" ? false : true}
            ></Tooltip>
          </div>
          {/* color picker  */}
          <div className="flex items-center" onClick={chosePen}>
            <Tooltip
              icon={faPen}
              text="colora"
              chosen={mode === "color" ? true : false}
            ></Tooltip>

            <input
              id="colorPalette"
              type="color"
              onChange={choseColor}
              value={currentColor}
            />
          </div>
        </div>
      </header>
    </>
  );
};
export default Header;
