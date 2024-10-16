import "./header.scss";
import { useColor } from "../../providers/ColorContext.jsx";
import { useGrid } from "../../providers/GridContext.jsx";
import { faEraser } from "@fortawesome/free-solid-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import Tooltip from "../tooltip/Tooltip.jsx";
const Header = () => {
  const { choseColor, currentColor, clearCells, choseErasor, mode, chosePen } =
    useColor();
  const {saveGridAsImage} = useGrid();

  return (
    <>
      <header>
        <h1 className="text-4xl uppercase font-bold">Pixel App</h1>
        <div className="flex gap-4 items-center">
          {/* salva  */}
          <div onClick={saveGridAsImage}>
            <Tooltip icon={faSave} text="Salva" chosen="ignore"></Tooltip>
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
            <span className="text-[#1e211d] font-bold uppercase" >
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
