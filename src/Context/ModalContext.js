import React, { createContext, useState, useEffect } from 'react';
import Axios from 'axios';

export const ModalContext = createContext();

const ModalProvider = (props) => {
    const [idreceta, guardarIdreceta] = useState(null);
    const [informacion, guardarReceta] = useState({});

    useEffect(() => {
        const obtenerReceta = async () => {
            if(!idreceta) return;
            const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idreceta}`; 
            const resultado = await Axios.get(url);
            guardarReceta(resultado.data.drinks[0]);           
        }
        obtenerReceta();
    }, [idreceta]);
    return (
        <ModalContext.Provider
            value={{
                informacion,
                guardarIdreceta,
                guardarReceta
            }}
        >
            {props.children}
        </ModalContext.Provider>
    );
}
 
export default ModalProvider;