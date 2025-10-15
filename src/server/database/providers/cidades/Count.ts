import { ETableNames } from "../../ETableNames.js";
import { Knex } from "../../knex/index.js";

export const count = async (filter: string | null): Promise<number | Error> => {
  try {
    const query = Knex(ETableNames.cidade);

    if (filter) {
      query.where("nome", "like", `%${filter}%`);
    }

    const result = await query.count<{ count: number }[]>("* as count");

    const count = result[0]?.count;

    if (count !== undefined && Number.isInteger(count)) {
      return count;
    }

    return new Error("Erro ao contar registros");
  } catch (error) {
    console.error("Erro ao contar registros:", error);
    return new Error("Erro ao contar registros");
  }
};