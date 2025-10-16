import { ETableNames } from "../../ETableNames.js";
import { IPessoa } from "../../models/Pessoa.js";
import { Knex } from "../../knex/index.js";

export const getAll = async (
  page: number,
  limit: number,
  filter: string,
): Promise<IPessoa[] | Error> => {
  try {
    const result = await Knex(ETableNames.pessoa)
      .select("*")
      .orWhere("nomeCompleto", "like", `%${filter}%`)
      .offset((page - 1) * limit)
      .limit(limit);

    return result as IPessoa[];
  } catch (error) {
    console.error("Erro ao buscar registros:", error);
    return new Error("Erro ao buscar registros");
  }
};
