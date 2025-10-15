import { ETableNames } from "../../ETableNames.js";
import { ICidade } from "../../models/Cidade.js";
import { Knex } from "../../knex/index.js";

export const getById = async (id: number): Promise<ICidade | Error> => {
  try {
    const result = await Knex(ETableNames.cidade)
      .select("*") // aqui você pode especificar as colunas que deseja selecionar
      .where("id", id)
      .first(); // para obter apenas o primeiro resultado, já que o ID é único

    if (result) {
      return result as ICidade;
    }

    return new Error("Registro não encontrado");
  } catch (error) {
    console.error("Erro ao buscar registro:", error);
    return new Error("Erro ao buscar registro");
  }
};
