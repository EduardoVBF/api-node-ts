import { ETableNames } from "../ETableNames.js";
import { Knex } from "knex";

export async function up(knex: Knex) {
  return knex.schema
    .createTable(ETableNames.usuario, (table: Knex.CreateTableBuilder) => {

      table.bigIncrements("id").primary().index();
      table.string("nome").notNullable().checkLength('>=', 3);
      table.string("senha").notNullable().checkLength('>=', 6);
      table.string("email").index().notNullable().unique().checkLength('>=', 5);


      table.comment("Tabela de usuarios");
    })
    .then(() => {
      console.log(`Tabela ${ETableNames.usuario} criada com sucesso!`);
    });
}

export async function down(knex: Knex) {
  return knex.schema.dropTableIfExists(ETableNames.usuario).then(() => {
    console.log(`Tabela ${ETableNames.usuario} removida com sucesso!`);
  });
}
