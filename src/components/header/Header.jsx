import "./header.scss";
import { useColor } from "../../providers/ColorContext.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEraser } from "@fortawesome/free-solid-svg-icons";
const Header = () => {
  const { choseColor, currentColor, clearCells } = useColor();

  return (
    <>
      <header>
        <h1 className="text-3xl">Pixel Art</h1>
        <div className="flex gap-4">
          {/* svuota celle  */}
          <div onClick={clearCells} className="cursor-pointer">
            Cancella tutto
            <FontAwesomeIcon icon={faEraser} className="ml-2"></FontAwesomeIcon>
          </div>
            {/* color picker  */}
          <div>
            <label htmlFor="colorPalette" className="mr-2">
              Scegli il colore
            </label>

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
