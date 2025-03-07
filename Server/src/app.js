import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: [
      // "https://video-tube-ficd.vercel.app",
      // "https://video-tube-3cch.vercel.app",
      // "http://localhost:5173",
    ],
    credentials: true,
  })
);

app.use(express.json({ limit: "200mb" }));
app.use(express.urlencoded({ extended: true, limit: "200mb" }));
app.use(express.static("public"));
app.use(cookieParser());

//routes
import adminRouter from "./routes/admin.routes.js";
import challengesRouter from "./routes/challenges.routes.js";
import completedRouter from "./routes/completed.routes.js";
import founderRouter from "./routes/founder.routes.js";
import subscriberRouter from "./routes/subscriber.routes.js";

app.get("/", (req, res) => res.send("Backend of system Altruism"));

app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/challenges", challengesRouter);
app.use("/api/v1/completed", completedRouter);
app.use("/api/v1/founder", founderRouter);
app.use("/api/v1/subscriber", subscriberRouter);

export { app };