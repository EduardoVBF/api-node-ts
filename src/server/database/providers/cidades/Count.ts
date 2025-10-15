import { ETableNames } from "../../ETableNames.js";
import { Knex } from "../../knex/index.js";

export const count = async (filter: ''): Promise<number | Error> => {
  try {
    const count = await Knex(ETableNames.cidade)
      .where("nome", "like", `%${filter}%`)
      .count<[{ count: number }]>("* as count");

    if (Number.isInteger(Number(count))) return Number(count);

    return new Error("Erro ao contar registros");
  } catch (error) {
    console.error("Erro ao contar registros:", error);
    return new Error("Erro ao contar registros");
  }
}; 