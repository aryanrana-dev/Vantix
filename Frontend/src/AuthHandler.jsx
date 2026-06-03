import { useState, useEffect, createContext, useContext, useRef } from "react";
import axios from "axios";
import { api, setAccessToken } from "./terminal/apiClient.mjs";

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
    const [token, setToken] = useState(null);
    const gotToken = useRef(false);

    useEffect(() => {
        async function fetchAccessToken() {
            try {
                const token = await axios.get("http://localhost:3000/api/token/refresh", {
                    withCredentials: true
                });
                console.log("Access token fetched: ", token.data);
                if (token.data) {
                    setToken(token.data);
                    setAccessToken(() => token.data);
                }
            } catch (error) {
                console.error("Error fetching access token:", error);
            }
        }
        if (!gotToken.current) {
            fetchAccessToken();
            gotToken.current = true;
        }
    }, [])

    return (
        <AuthContext.Provider value={{ token }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);