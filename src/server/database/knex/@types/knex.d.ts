import { ICidade } from "../../models/Cidade.ts";

declare module "knex/types/tables" {
  interface Tables {
    cidade: ICidade;
    // estado: IEstado;
    // pais: IPais;
  }
}