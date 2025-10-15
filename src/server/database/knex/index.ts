import knex from "knex";
import { development, production, test } from "./Environment.js";

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
