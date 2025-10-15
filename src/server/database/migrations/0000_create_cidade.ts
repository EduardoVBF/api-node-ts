import { Knex } from "knex";
import { ETableNames } from "../ETableNames.js";

export async function up(knex: Knex) {
  return knex.schema
    .createTable(ETableNames.cidade, (table: Knex.CreateTableBuilder) => {
      table.bigIncrements("id").primary().index();
      table.string("nome", 100).checkLength("<=", 100).notNullable().index();

      table.comment("Tabela de cidades");
    })
    .then(() => {
      console.log(`Tabela ${ETableNames.cidade} criada com sucesso!`);
    });
}

export async function down(knex: Knex) {
  return knex.schema.dropTableIfExists(ETableNames.cidade).then(() => {
    console.log(`Tabela ${ETableNames.cidade} removida com sucesso!`);
  });
}
