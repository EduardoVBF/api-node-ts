import { Knex } from "../src/server/database/knex/index.js";
import { server } from "../src/server/server.js";
import supertest from "supertest";

beforeAll(async () => {
  await Knex.migrate.latest();
  await Knex.seed.run();
});

afterAll(async () => {
  // await Knex.migrate.rollback();
  await Knex.destroy();
});

export const testServer = supertest(server);