import { ETableNames } from "../../ETableNames.js";
import { ICidade } from "../../models/Cidade.js";
import { Knex } from "../../knex/index.js";

export const getAll = async (
  page: number,
  limit: number,
  filter: string,
  id = 0
): Promise<ICidade[] | Error> => {
  try {
    const result = await Knex(ETableNames.cidade)
      .select("*")
      .where("id", Number(id))
      .orWhere("nome", "like", `%${filter}%`)
      .offset((page - 1) * limit)
      .limit(limit);

    if (id > 0 && result.every((item) => item.id !== id)) {
      const resultById = await Knex(ETableNames.cidade)
        .select("*")
        .where("id", Number(id))
        .first();

      if (resultById) {
        return [resultById as ICidade, ...result];
      }

      return new Error("Registro não encontrado");
    }

    return result as ICidade[];
  } catch (error) {
    console.error("Erro ao buscar registros:", error);
    return new Error("Erro ao buscar registros");
  }
};
