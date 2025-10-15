import * as updatebyid from "./UpdateById.js";
import * as deletebyid from "./DeleteById.js";
import * as getbyid from "./GetById.js";
import * as create from "./Create.js";
import * as getall from "./GetAll.js";
import * as count from "./Count.js";

export const CidadesProvider = {
  ...create,
  ...getall,
  ...getbyid,
  ...count,
  ...updatebyid,
  ...deletebyid,
};