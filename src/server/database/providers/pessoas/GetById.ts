import { ETableNames } from "../../ETableNames.js";
import { IPessoa } from "../../models/Pessoa.js";
import { Knex } from "../../knex/index.js";

export const getById = async (id: number): Promise<IPessoa | Error> => {
  try {
    const result = await Knex(ETableNames.pessoa)
      .select("*") // aqui você pode especificar as colunas que deseja selecionar
      .where("id", id)
      .first(); // para obter apenas o primeiro resultado, já que o ID é único

    if (result) {
      return result as IPessoa;
    }

    return new Error("Registro não encontrado");
  } catch (error) {
    console.error("Erro ao buscar registro:", error);
    return new Error("Erro ao buscar registro");
  }
};