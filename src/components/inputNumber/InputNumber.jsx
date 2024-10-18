import { useGrid } from '../../providers/GridContext';
import './inputNumber.scss';

const InputNumber = ({id, lab, func, placeholder}) => {

  const {min, max} = useGrid();
     return (
       <>
         <label htmlFor={id}>{lab}</label>
         <input
           type="number"
           id={id}
           onChange={func}
           min={min}
           max={max}
           placeholder={placeholder}
         />
       </>
     );
}
export default InputNumber;