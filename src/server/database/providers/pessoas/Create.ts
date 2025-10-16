import { ETableNames } from "../../ETableNames.js";
import { IPessoa } from "../../models/Pessoa.js";
import { Knex } from "../../knex/index.js";

export const create = async (
  pessoa: Omit<IPessoa, "id">
): Promise<number | Error> => {
  try {
    const result = await Knex(ETableNames.cidade)
      .where("id", pessoa.cidadeId)
      .count<{ count: number }[]>("* as count");

    const count = Number(result[0]?.count ?? 0);

    if (count === 0) {
      return new Error("Cidade utilizada no cadastro não encontrada");
    }

    const [resultInsert] = await Knex(ETableNames.pessoa)
      .insert(pessoa)
      .returning("id");

    if (typeof resultInsert === "object") {
      return resultInsert.id;
    } else if (typeof resultInsert === "number") {
      return resultInsert;
    }

    return new Error("Erro ao cadastrar pessoa");
  } catch (error) {
    console.log(error);
    return new Error("Erro ao cadastrar pessoa");
  }
};
