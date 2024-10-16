import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './tooltip.scss'

const Tooltip = ({icon, text}) => {
     return (
       <>
         <div className="tooltip-container">
           <span className="tooltip">{text}</span>
           <span className="text">
             <FontAwesomeIcon
               icon={icon}
               className="ml-2"
             ></FontAwesomeIcon>
           </span>
         </div>
       </>
     );
}
export default Tooltip;