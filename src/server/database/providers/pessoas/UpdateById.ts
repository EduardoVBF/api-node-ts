import { ETableNames } from "../../ETableNames.js";
import { IPessoa } from "../../models/Pessoa.js";
import { Knex } from "../../knex/index.js";

export const updateById = async (id: number, pessoa: Omit<IPessoa, "id">): Promise<void | Error> => {
  try {
    const [{ count } = { count: 0 }] = await Knex(ETableNames.cidade)
      .where("id", pessoa.cidadeId)
      .count<{ count: number }[]>("* as count");

    if (Number(count) === 0) {
      return new Error("Cidade utilizada no cadastro não encontrada");
    }

    const result = await Knex(ETableNames.pessoa).where("id", id).update(pessoa);

    if (result > 0) return;

    return new Error("Erro ao atualizar registro");
  } catch (error) {
    console.error("Erro ao atualizar registro:", error);
    return new Error("Erro ao atualizar registro");
  }
};