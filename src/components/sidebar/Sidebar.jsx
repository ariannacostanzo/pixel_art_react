import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./sidebar.scss";
import {
  faArrowsRotate,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import InputNumber from "../inputNumber/InputNumber";
import { useGrid } from "../../providers/GridContext";
import Tooltip from "../tooltip/Tooltip";
import { useState } from "react";

const Sidebar = () => {
  const { choseGridWidth, choseGridHeight, handleResize, choseCellDimension } =
    useGrid();

  const sendForm = (e) => {
    e.preventDefault();
    handleResize();
  };

  const [isSidebarVisible, setIsSidebarVisible] = useState();

  return (
    <>
      <div className={`sidebar ${isSidebarVisible ? "" : "hidden-sidebar"}`}>
        {/* linguetta  */}
        <div
          className="tab"
          onClick={() => setIsSidebarVisible(!isSidebarVisible)}
        >
          <FontAwesomeIcon
            icon={isSidebarVisible ? faChevronRight : faChevronLeft}
          ></FontAwesomeIcon>
        </div>
        {/* cambia dimensioni griglia  */}
        <form className=" my-4" onSubmit={sendForm}>
          <div className="text-center">
            <div>
              <InputNumber
                id="gridWidth"
                lab="Larghezza griglia"
                func={choseGridWidth}
                placeholder="70"
              ></InputNumber>
            </div>
            <div className="mt-1">
              <InputNumber
                id="gridHeight"
                lab="Altezza griglia"
                func={choseGridHeight}
                placeholder="35"
              ></InputNumber>
            </div>
            <div className="mt-1">
              <InputNumber
                id="cellDimension"
                lab="Dimensioni cella"
                func={choseCellDimension}
                placeholder="20"
              ></InputNumber>
            </div>
          </div>
          <div className="flex items-center justify-center mt-5">
            <button type="submit">
              <Tooltip
                icon={faArrowsRotate}
                text="Rigenera griglia"
                chosen="ignore"
              ></Tooltip>
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
export default Sidebar;
