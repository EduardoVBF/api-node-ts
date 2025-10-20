import { Knex } from "knex";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baseConfig: Knex.Config = {
  client: "sqlite3",
  useNullAsDefault: true,
  migrations: {
    directory: path.resolve(__dirname, "../migrations"),
  },
  seeds: {
    directory: path.resolve(__dirname, "../seeds"),
  },
  pool: {
    afterCreate: (
      connection: import("sqlite3").Database,
      done: (err?: Error | null) => void
    ) => {
      connection.run("PRAGMA foreign_keys = ON");
      done();
    },
  },
};

// 👇 Exporta configs diferentes para cada ambiente
export const development: Knex.Config = {
  ...baseConfig,
  connection: {
    filename: path.resolve(__dirname, "../../../../database.sqlite"),
  },
};

export const test: Knex.Config = {
  ...baseConfig,
  connection: { filename: ":memory:" },
};

// 🚀 Produção (Vercel)
export const production: Knex.Config = {
  client: "pg",
  migrations: {
    directory: path.resolve(__dirname, "../migrations"),
  },
  seeds: {
    directory: path.resolve(__dirname, "../seeds"),
  },
  connection: {
    host: process.env.DB_HOST ?? "",
    user: process.env.DB_USER ?? "",
    database: process.env.DB_NAME ?? "",
    password: process.env.DB_PASSWORD ?? "",
    port: Number(process.env.DB_PORT ?? "5432"),
    ssl: { rejectUnauthorized: false },
  }
};
