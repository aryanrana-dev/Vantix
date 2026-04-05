import { WebSocketServer } from "ws";

export function initWebSockets(server) {
    const wss = new WebSocketServer({ server });

    wss.on("connection", (ws) => {
        console.log("Client connected");
        let clientSymbols = [];
        let intervalId = null;

        const sendUpdate = async () => {
            if (clientSymbols.length === 0) return;
            try {
                const marketData = await Promise.all(clientSymbols.map(async (symbol) => {
                    let stockURL = `https://financialmodelingprep.com/stable/quote?symbol=${symbol}&apikey=${process.env.STOCK_API_KEY_1}`;
                    let res = await fetch(stockURL);
                    let jsonArray = await res.json();
                    let json = Array.isArray(jsonArray) ? jsonArray[0] : jsonArray;

                    return {
                        symbol: json?.symbol || symbol,
                        name: json?.name || symbol,
                        price: json?.price.toFixed(2) || 0,
                        change: json?.change.toFixed(2) || 0,
                        changePercent: json?.changePercentage.toFixed(2) || json?.changePercent.toFixed(2) || 0,
                        high: json?.dayHigh.toFixed(2) || json?.high.toFixed(2) || 0,
                        low: json?.dayLow.toFixed(2) || json?.low.toFixed(2) || 0,
                        previousClose: json?.previousClose.toFixed(2) || json?.price.toFixed(2) || 0
                    };
                }));
                if (ws.readyState === 1) { // 1 is OPEN
                    ws.send(JSON.stringify(marketData));
                }
            } catch (error) {
                console.log("Error fetching market data:", error);
            }
        };

        ws.on("message", async (data) => {
            try {
                clientSymbols = JSON.parse(data.toString());
                console.log("Subscribed to:", clientSymbols);

                // Send immediate update
                await sendUpdate();

                // Setup interval if not already set
                if (!intervalId) {
                    intervalId = setInterval(sendUpdate, 10000);
                }
            } catch (error) {
                console.log("Error parsing symbols:", error);
            }
        });

        ws.on("close", () => {
            console.log("Client disconnected");
            if (intervalId) clearInterval(intervalId);
        });
    });
}