import supertest from "supertest";
import { server } from "../src/server/server.js";

export const testServer = supertest(server)