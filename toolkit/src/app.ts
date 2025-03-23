import express from "express";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import cors from "cors";
import mailFunctionRouter from "./Email/Emailfunction/mailFunctionRouter";
const app = express();
app.use(express.json());
app.use(cors());
const basePath = "/api";

app.get(`/test`, (req, res, next) => {
  res.json({ message: "Hello World" });
});


app.use(basePath,mailFunctionRouter);

// global error handle
// @ts-ignore
app.use(globalErrorHandler);

export default app;
