import { ETableNames } from "../../ETableNames.js";
import { ICidade } from "../../models/Cidade.js";
import { Knex } from "../../knex/index.js";

export const updateById = async (id: number, cidade: Omit<ICidade, "id">): Promise<void | Error> => {
  try {
    const result = await Knex(ETableNames.cidade).where("id", id).update(cidade);

    if (result > 0) return;

    return new Error("Erro ao atualizar registro");
  } catch (error) {
    console.error("Erro ao atualizar registro:", error);
    return new Error("Erro ao atualizar registro");
  }
};