import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";

import router from "./routes/index.js";
import errorMiddleware from "./middleware/errorMiddleware.js";
import swaggerConfig from "./docs/index.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT;
const DB_CONNECT = process.env.DB_CONNECT;

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors());
app.use("/upload", express.static("src/upload"));
app.use("/api", router);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerConfig));
app.use(errorMiddleware);

const start = async () => {
  await mongoose
    .connect(DB_CONNECT)
    .then(() => {
      console.log("DB started");
    })
    .catch((err) => {
      console.log(err, "DB crashed");
    });

  app.listen(PORT, (err) => {
    if (err) {
      return console.log(err, "Server crashed");
    }
    console.log(`Server started on port: ${PORT}`);
  });
};

start();
