import React, { createContext, useState, useEffect } from 'react';
import Axios from 'axios';

export const RecetasContext = createContext();

const RecetasProvider = (props) => {
    const [recetas, guardarRecetas] = useState([]);
    const [busqueda, buscarRecetas] = useState({
        nombre: '',
        categoria: ''
    });
    const [consultar, guardarConsultar] = useState(false);

    const {nombre, categoria} = busqueda;

    useEffect(() => {
        const obtenerRecetas = async () => {
            const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${nombre}&c=${categoria}`;
            const resultado = await Axios.get(url);
            // console.log(resultado.data.drinks);
            guardarRecetas(resultado.data.drinks);
        }
        if(consultar)
            obtenerRecetas();
        // eslint-disable-next-line
    }, [busqueda])
    return (
        <RecetasContext.Provider
            value={{
                recetas,
                buscarRecetas,
                guardarConsultar
            }}
        >
            {props.children}
        </RecetasContext.Provider>
    );
}
 
export default RecetasProvider;