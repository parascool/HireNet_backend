import express from "express";
import { dbConnection } from "./database/dbConnection.js";
import jobRouter from "./routes/jobRoutes.js";
import userRouter from "./routes/userRoutes.js";
import applicationRouter from "./routes/applicationRoutes.js";
import { config } from "dotenv";
import cors from "cors";
import { errorMiddleware } from "./middlewares/error.js";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename)

const app = express();
config({ path: "./config/config.env" });

app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    method: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.get("/", (req, res) => {
//   app.use(express.static(path.resolve(__dirname, "frontend", "dist")));
//   res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
// })

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/job", jobRouter);
app.use("/api/v1/application", applicationRouter);
dbConnection();

app.use(errorMiddleware);
export default app;
