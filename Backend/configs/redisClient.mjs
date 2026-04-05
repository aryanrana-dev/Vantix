import { createClient } from "redis";
import dotenv from "dotenv";
dotenv.config();

const client = createClient({
    url: process.env.REDIS_EXTERNAL_CLOUD_URL
})

client.on("error", (err) => {
    console.log("Redis Client Error", err);
})

await client.connect();

// const keys = await client.keys("*");
// const data = await client.get(keys[0]);
// console.log(keys);
// console.log(data);

// for (let key of keys) {
//     await client.del(key);
//     console.log(`Deleted key: ${key}`);
// }

export default client;