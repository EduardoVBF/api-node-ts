import { ICidade } from "../../models/Cidade.ts";
import { IPessoa } from "../../models/Pessoa.js";

declare module "knex/types/tables" {
  interface Tables {
    cidade: ICidade;
    pessoa: IPessoa;
  }
}