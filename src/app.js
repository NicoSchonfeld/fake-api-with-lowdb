import express from "express";
import morgan from "morgan";
import cors from "cors";

import taskRoutes from "./routes/task.js";

const app = express();

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded(true));
app.use(morgan());
app.use(cors());
app.use(express.static("public"));

app.use(taskRoutes);

export default app;
