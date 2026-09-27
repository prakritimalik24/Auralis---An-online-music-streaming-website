import React from "react";
import { createContext, useState, useEffect } from "react";
import api from "../services/api";

const AuthContext = createContext();

function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {

        const getuser = async () => {

            try {

                const response = await api.get("/api/auth/me");

                setUser(response.data.user);


            } catch (err) {
                setUser(null);

            } finally {

                setLoading(false);

            }
        };

        getuser();

    }, []);


    const logout = async () => {

        try {

            await api.post("/api/auth/logout");

            setUser(null);

        } catch (err) {

            console.log(err);

        }
    };


    return (
        <AuthContext.Provider value={{ user, setUser, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export { AuthProvider };
export default AuthContext;