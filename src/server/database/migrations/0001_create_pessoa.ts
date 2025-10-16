import { Knex } from "knex";
import { ETableNames } from "../ETableNames.js";

export async function up(knex: Knex) {
  return knex.schema
    .createTable(ETableNames.pessoa, (table: Knex.CreateTableBuilder) => {
      table.bigIncrements("id").primary().index();
      table.string("nomeCompleto").notNullable().index();
      table.string("email").notNullable().unique();

      table
        .bigInteger("cidadeId")
        .index()
        .notNullable()
        .references("id")
        .inTable(ETableNames.cidade)
        .onUpdate("CASCADE")
        .onDelete("RESTRICT");

      table.comment("Tabela de pessoas");
    })
    .then(() => {
      console.log(`Tabela ${ETableNames.pessoa} criada com sucesso!`);
    });
}

export async function down(knex: Knex) {
  return knex.schema.dropTableIfExists(ETableNames.pessoa).then(() => {
    console.log(`Tabela ${ETableNames.pessoa} removida com sucesso!`);
  });
}
