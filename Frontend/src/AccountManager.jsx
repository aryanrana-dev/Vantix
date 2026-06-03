import { useState, createContext, useContext } from "react";
import { api, setAccessToken } from "./terminal/apiClient.mjs";
import { useAuth } from "./AuthHandler";

const AccountManagerContext = createContext();

export function AccountManagerProvider({ children }) {
    const { token } = useAuth();
    setAccessToken(() => token);
    const [orders, setOrders] = useState([]);

    const updateOrders = async (newOrder) => {
        console.log(newOrder);
        setOrders((prevOrders) => {
            return [...prevOrders, newOrder];
        })
        await api.post("/orders", newOrder);
    }

    const fetchOrders = async () => {
        const orders = await api.get("/orders");
        setOrders(orders.data);
    }

    const cancelOrder = async (orderId) => {
        await api.patch(`orders/${orderId}`, { status: "CLOSED" });
        fetchOrders();
    }

    return (
        <AccountManagerContext.Provider value={{ orders, updateOrders, fetchOrders, cancelOrder }}>
            {children}
        </AccountManagerContext.Provider>
    )
}

export const useAccountManager = () => useContext(AccountManagerContext);