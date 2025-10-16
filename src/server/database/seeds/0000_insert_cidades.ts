import { Knex } from "knex";
import { ETableNames } from "../ETableNames.js";

export const seed = async (knex: Knex) => {
  const result = await knex(ETableNames.cidade).count<{ count: string }[]>("* as count");
  const count = Number(result[0]?.count ?? 0);

  if (!Number.isInteger(count) || count > 0) return;

  const cidadesToInsert = [
    { nome: "Acrelândia" },
    { nome: "Assis Brasil" },
    { nome: "Brasiléia" },
    { nome: "Bujari" },
    { nome: "Capixaba" },
    { nome: "Cruzeiro do Sul" },
    { nome: "Epitaciolândia" },
    { nome: "Feijó" },
    { nome: "Jordão" },
    { nome: "Mâncio Lima" },
    { nome: "Manoel Urbano" },
    { nome: "Marechal Thaumaturgo" },
    { nome: "Plácido de Castro" },
    { nome: "Porto Acre" },
    { nome: "Porto Walter" },
    { nome: "Rio Branco" },
    { nome: "Rodrigues Alves" },
    { nome: "Santa Rosa do Purus" },
    { nome: "Sena Madureira" },
    { nome: "Senador Guiomard" },
    { nome: "Tarauacá" },
    { nome: "Xapuri" },
  ];

  await knex(ETableNames.cidade).insert(cidadesToInsert);
};
