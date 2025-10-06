import { router } from "./routes/index.js";
import express from "express";
import "dotenv/config";

const server = express();

server.use(express.json());
server.use(router);

export { server };
