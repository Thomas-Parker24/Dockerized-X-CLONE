import express from "express";
import swaggerUi from "swagger-ui-express";
import { logInRouter } from "./LogIn/Routes/index.js";
import { postRouter } from "./Posts/Routes/index.js";
import { userRouter } from "./Users/Routes/index.js";
import { swaggerDocs } from "./docs.js";
import cors from "cors";
import Cache from "node-cache";

export const NodeCache = new Cache();
export const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use("/api/v1", userRouter);
app.use("/api/v1", logInRouter);
app.use("/api/v1", postRouter);
