import { ETableNames } from "../../ETableNames.js";
import { IUsuario } from "../../models/Usuario.js";
import { Knex } from "../../knex/index.js";

export const getByEmail = async (email: string): Promise<IUsuario | Error> => {
  try {
    const result = await Knex(ETableNames.usuario)
      .select("*") // aqui você pode especificar as colunas que deseja selecionar
      .where("email", email)
      .first(); // para obter apenas o primeiro resultado, já que o email é único

    if (result) {
      return result as IUsuario;
    }

    return new Error("Registro não encontrado");
  } catch (error) {
    console.error("Erro ao buscar registro:", error);
    return new Error("Erro ao buscar registro");
  }
};
