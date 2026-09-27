import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const FavContext = createContext();

function FavoritesProvider({ children }) {
    const [favorites, setfavorites] = useState([]);

    const getfav = async () => {
        try {
            const response = await api.get("/api/fav/");
            setfavorites(response.data.favs);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getfav();
    }, []);

    return (
        <FavContext.Provider
            value={{
                favorites,
                setfavorites,
                getfav
            }}
        >
            {children}
        </FavContext.Provider>
    );
}

export {FavoritesProvider}

export default FavContext;