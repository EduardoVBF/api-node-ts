import "./shared/services/TranslationsYup.js";
import { router } from "./routes/index.js";
import express from "express";
import cors from "cors";
import "dotenv/config";

const server = express();

server.use(cors({
  // origin: ["http://localhost:3000", "https://appname.neon.tech"],
  origin: ["*"],
}));
server.use(express.json());
server.use(router);

export { server };
