import * as getbyid from "./GetById.js";
import * as create from "./Create.js";
import * as getall from "./Getall.js";

export const CidadeController = {
  ...create,
  ...getall,
  ...getbyid,
};