import { ETableNames } from "../../ETableNames.js";
import { Knex } from "../../knex/index.js";
import { ICidade } from "../../models/Cidade.js";

export const create = async (
  cidade: Omit<ICidade, "id">
): Promise<number | Error> => {
  try {
    const [result] = await Knex(ETableNames.cidade).insert(cidade).returning("id");

    if (typeof result === 'object') {
      return result.id;
    } else if (typeof result === 'number') {
      return result;
    }

    return new Error("Erro ao cadastrar cidade");

  } catch (error) {
    console.log(error);
    return new Error("Erro ao cadastrar cidade");
  }
};
