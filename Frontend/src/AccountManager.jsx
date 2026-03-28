import { useState, createContext, useContext } from "react";
import axios from "axios";

const AccountManagerContext = createContext();

export function AccountManagerProvider({ children }) {
    const [orders, setOrders] = useState([]);

    const updateOrders = async (newOrder) => {
        // Temporarily commented out to avoid backend crash and rely on local state
        console.log(newOrder);
        setOrders((prevOrders) => {
            return [...prevOrders, newOrder];
        })
        await axios.post("http://localhost:3000/orders", newOrder);
    }

    return (
        <AccountManagerContext.Provider value={{ orders, updateOrders }}>
            {children}
        </AccountManagerContext.Provider>
    )
}

export const useAccountManager = () => useContext(AccountManagerContext);