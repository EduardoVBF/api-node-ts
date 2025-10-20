import { development, production, test } from "./Environment.js";
import "dotenv/config.js";
import knex from "knex";
import pg from "pg";

// Corrige o problema de parsing de inteiros grandes no PostgreSQL
if (process.env.NODE_ENV === "production") {
  pg.types.setTypeParser(20, 'text', parseInt);
};

const getEnvironment = () => {
  switch (process.env.NODE_ENV) {
    case "dev":
      return development;
    case "test":
      return test;
    case "production":
      return production;
    default:
      return development;
  }
};

export const Knex = knex(getEnvironment());
