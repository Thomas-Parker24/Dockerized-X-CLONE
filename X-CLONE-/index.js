import { app } from "./app.js";
import dotenv from "dotenv";
import { ConnectToDataBase, RedisClient } from "./Database/Controller/index.js";

dotenv.config();
ConnectToDataBase();
RedisClient.connect();
console.log("Connected to Redis");
app.listen(process.env.PORT, () => {
  console.log(
    `Server is running on port: http://localhost:${process.env.PORT}`
  );
});
