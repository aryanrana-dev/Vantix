import { useState, useEffect, createContext, useContext, useRef } from "react";

const MarketLivePriceContext = createContext();

export function MarketLivePriceProvider({ children }) {
    const [symbols, setSymbols] = useState([]);
    const [marketData, setMarketData] = useState([]);
    const wsRef = useRef(null);

    const updateSymbols = (newSymbols) => {
        setSymbols(newSymbols);
        return;
    }

    const symbolsRef = useRef(symbols);

    // Sync state to ref so closure always reads the latest symbols
    useEffect(() => {
        symbolsRef.current = symbols;
    }, [symbols]);

    useEffect(() => {
        const ws = new WebSocket("ws://localhost:3000");
        wsRef.current = ws;

        ws.onopen = () => {
            if (symbolsRef.current.length > 0) {
                ws.send(JSON.stringify(symbolsRef.current));
            }
        };

        ws.onmessage = (event) => {
            const response = JSON.parse(event.data);
            setMarketData(response);
        };

        return () => {
            // Check readyState to prevent StrictMode "closed before establishment" warnings
            if (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING) {
                ws.close();
            }
        };
    }, []);

    useEffect(() => {
        if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN && symbols.length > 0) {
            wsRef.current.send(JSON.stringify(symbols));
        }
    }, [symbols]);

    return (
        <MarketLivePriceContext.Provider value={{ marketData, updateSymbols }}>
            {children}
        </MarketLivePriceContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useMarketData = () => useContext(MarketLivePriceContext);