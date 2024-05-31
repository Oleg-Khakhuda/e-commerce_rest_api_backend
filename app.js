import express from "express";
import logger from "morgan";
import helmet from "helmet";
import cors from "cors";
import { LIMIT_JSON } from "./lib/constants.js";
import { HttpCode } from "./lib/constants.js";

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(helmet());
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json({ limit: LIMIT_JSON }));
app.use(express.urlencoded({ extended: true }));

app.use((req, res) => {
    res
      .status(HttpCode.NOT_FOUND)
      .json({ status: "error", code: HttpCode.NOT_FOUND, message: "Not found" });
  });
  
  app.use((err, req, res, next) => {
    const statusCode = err.status || HttpCode.INTERNAL_SERVER_ERROR;
    const status =
    statusCode === HttpCode.INTERNAL_SERVER_ERROR ? "fail" : "error";
    res.status().json({
    status: status,
    code: statusCode,
    message: err.message,
    });
  });
  
  export default app;