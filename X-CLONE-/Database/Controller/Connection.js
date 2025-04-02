import { connect } from "mongoose";
import { createClient } from "redis";

import dotenv from "dotenv";
dotenv.config();

export async function ConnectToDataBase() {
  try {
    await connect(process.env.clusterPath)
      .then(() => {
        console.log("Database connected successfully!");
      })
      .catch((error) => {
        console.log("Databse can't be connected, ", error);
      });
  } catch (error) {
    return {
      ok: false,
      error: error?.message,
    };
  }
}

const RedisClient = createClient({
  socket: {
    host: process.env.RedisHostName,
    port: process.env.RedisHostPort,
  },
});
