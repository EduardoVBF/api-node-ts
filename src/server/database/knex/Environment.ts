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
    host: process.env.PGHOST ?? "",
    user: process.env.PGUSER ?? "",
    database: process.env.PGDATABASE ?? "",
    password: process.env.PGPASSWORD ?? "",
    port: Number(process.env.DB_PORT ?? "5432"),
    ssl: { rejectUnauthorized: false },
  }
};
