import { app } from "./app.js";
import dotenv from "dotenv";
import { ConnectToDataBase } from "./Database/Controller/index.js";

dotenv.config();
ConnectToDataBase();
app.listen(process.env.PORT, () => {
  console.log(
    `Server is running on port: http://localhost:${process.env.PORT}`
  );
});
