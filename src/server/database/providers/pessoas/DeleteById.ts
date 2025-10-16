import { ETableNames } from "../../ETableNames.js";
import { Knex } from "../../knex/index.js";

export const deleteById = async (id: number): Promise<void | Error> => {
  try {
    const result = await Knex(ETableNames.pessoa).where("id", id).del();

    if (result > 0) return;

    return new Error("Erro ao deletar registro");
  } catch (error) {
    console.error("Erro ao deletar registro:", error);
    return new Error("Erro ao deletar registro");
  }
};