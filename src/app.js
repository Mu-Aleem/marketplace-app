import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";

const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());
app.use(morgan("dev"));

//routes import
import userRouter from "./routes/users/user.routes.js";
import prodctRouter from "./routes/products/product.routes.js";

import healthcheckRouter from "./routes/healthcheck.routes.js";
import { errorHandler } from "./middlewares/errorHandler.js";

//routes declaration
app.use("/api/v1/healthcheck", healthcheckRouter);

// user
app.use("/api/v1/users", userRouter);
// products
app.use("/api/v1/product", prodctRouter);

// errror handler
app.use(errorHandler);

export { app };
