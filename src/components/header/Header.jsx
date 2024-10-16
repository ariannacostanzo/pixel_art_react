import { useState } from 'react'
import './header.scss'

const Header = () => {

    const [currentColor, setCurrentColor] = useState('#FFFFFF');

    const choseColor = (e) => {
        setCurrentColor(e.target.value)
    }
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