import { useEffect, useState } from "react";

const useStorage = (initialValue, itemKey) => {
    const [state, setState] = useState(() => {
      try {
        const itemValue = localStorage.getItem(itemKey);
        // Se esiste un valore valido nel localStorage, lo prendo
        if (itemValue !== null) {
          return JSON.parse(itemValue);
        } else {
          // Altrimenti utilizzo il valore passato e lo salvo nello storage
          localStorage.setItem(itemKey, JSON.stringify(initialValue));
          return initialValue;
        }
      } catch (error) {
        console.error("Errore nel parsing di localStorage:", error);
        return initialValue;
      }
    });

    // Sincronizzo il localStorage ogni volta che cambia lo stato
    useEffect(() => {
      try {
        localStorage.setItem(itemKey, JSON.stringify(state));
      } catch (error) {
        console.error("Errore nel salvare in localStorage:", error);
      }
    }, [state, itemKey]);

    return [state, setState];
};

export default useStorage;
