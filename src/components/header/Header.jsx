import './header.scss'
import { useColor } from '../../providers/ColorContext.jsx';

const Header = () => {
    const {choseColor, currentColor} = useColor();

    
     return (
       <>
         <header>
           <h1 className="text-3xl">Pixel Art</h1>
           <div>
             <label htmlFor="colorPalette" className='mr-2'> Scegli il colore</label>

             <input 
             id='colorPalette'
               type="color"
               onChange={choseColor}
               value={currentColor}
             />
           </div>
         </header>
       </>
     );
}
export default Header;