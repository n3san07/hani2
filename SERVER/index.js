import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import Logger from "./utils/logger.js";
import { mongoConectLocally } from "./mongodb/conectLocal.js";
import { mongoConectAtlas } from "./mongodb/conectAtlas.js";
import { usersRoutes } from "./routes/usersRoutes.js";
import { ResidencyRoutes } from "./routes/ResidencyRoutes.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

const mode = process.argv[2];
const PORT = process.env.PORT || 3001;
console.log(mode);
if (mode === "development" || mode === "dev") {
  mongoConectLocally();
} else {
  mongoConectAtlas();
}

app.use((req, res, next) => {
  console.log("\x1b[37m", `method: ( ${req.method} ) -- path: ${req.path} `);
  Logger.info(
    `method: ( ${req.method} ) -- path: ${req.path} -- res: ${res.body} `
  );

  next();
});
app.listen(PORT, () => {
  console.log("\x1b[33m%s\x1b[0m", `listen on Port ${PORT} in ${mode} mode  `);
});

app.use("/api/Users", usersRoutes);
app.use("/api/Residency", ResidencyRoutes);
