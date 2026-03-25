const express = require("express");
const app = express();
const { WebSocketServer } = require("ws");
const port = 3000;

const server = app.listen(port, () => {
    console.log("Listening to localhost:3000")
})

const wss = new WebSocketServer({ server });
let symbols = [];

wss.on("connection", (ws) => {
    console.log("Client connected");
    ws.on("message", async (data) => {
        try {
            symbols = JSON.parse(data.toString());
            const marketData = await Promise.all(symbols.map(async (symbol) => {
                let stockURL = `https://financialmodelingprep.com/stable/quote?symbol=${symbol}&apikey=sgv9puFAWNtjFYtQe8N96X8mM4HLwEl2`;
                let res = await fetch(stockURL);
                let jsonArray = await res.json();
                let json = Array.isArray(jsonArray) ? jsonArray[0] : jsonArray;

                return {
                    symbol: json?.symbol || symbol,
                    name: json?.name || symbol,
                    price: json?.price || 0,
                    change: json?.change || 0,
                    changePercent: json?.changePercentage || json?.changePercent || 0,
                    high: json?.dayHigh || json?.high || 0,
                    low: json?.dayLow || json?.low || 0,
                    previousClose: json?.previousClose || json?.price || 0
                };
            }));
            ws.send(JSON.stringify(marketData));
        } catch (error) {
            console.log(error);
        }
    })
    ws.on("close", () => {
        console.log("Client disconnected");
    })
})