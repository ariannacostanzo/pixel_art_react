import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './tooltip.scss'

const Tooltip = ({icon, text, chosen}) => {

 

     return (
       <>
         <div className="tooltip-container">
           <span className="tooltip">{text}</span>
           <span
             className="text"
             style={{
               boxShadow: chosen
                 ? chosen === "ignore" ? '' : "1px 1px 5px 1px black inset"
                 : "1px 1px 5px 1px black",
             }}
           >
             <FontAwesomeIcon icon={icon}></FontAwesomeIcon>
           </span>
         </div>
       </>
     );
}
export default Tooltip;