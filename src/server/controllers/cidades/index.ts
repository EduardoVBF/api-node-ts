import * as updatebyid from "./UpdateById.js"; 
import * as deletebyid from "./DeleteById.js";
import * as getbyid from "./GetById.js";
import * as create from "./Create.js";
import * as getall from "./Getall.js";

export const CidadeController = {
  ...create,
  ...getall,
  ...getbyid,
  ...updatebyid,
  ...deletebyid,
};