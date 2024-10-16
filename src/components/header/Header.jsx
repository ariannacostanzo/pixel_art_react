import "./header.scss";
import { useColor } from "../../providers/ColorContext.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEraser } from "@fortawesome/free-solid-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { faFile } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import Tooltip from "../tooltip/Tooltip.jsx";
const Header = () => {
  const { choseColor, currentColor, clearCells, choseErasor, mode } =
    useColor();

  useEffect(() => {
    console.log(mode);
  }, [mode]);

  return (
    <>
      <header>
        <h1 className="text-3xl">Pixel Art</h1>
        <div className="flex gap-4 items-center">
          {/* svuota celle  */}
          <div onClick={clearCells} className="cursor-pointer">
            <Tooltip icon={faFile} text="Cancella tutto"></Tooltip>
          </div>
          {/* color picker  */}
          <div>
            <label htmlFor="colorPalette" className="mr-2">
              <Tooltip icon={faPen} text="Scegli il colore"></Tooltip>
            </label>

            <input
              id="colorPalette"
              type="color"
              onChange={choseColor}
              value={currentColor}
            />
          </div>
          <div onClick={choseErasor}>
            <Tooltip icon={faEraser} text="Cancella"></Tooltip>
            Cancella
            <FontAwesomeIcon icon={faEraser} className="ml-2"></FontAwesomeIcon>
          </div>
          <div>Modalità: {mode === "color" ? "Colora" : "Cancella"}</div>
        </div>
      </header>
    </>
  );
};
export default Header;
