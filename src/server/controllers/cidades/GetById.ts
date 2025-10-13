import { validation } from "../../shared/middlewares/Validation.js";
import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import * as yup from "yup";

export interface IParamProps {
  id?: number;
}

export const getByIdValidation = validation((getschema) => ({
  params: getschema<IParamProps>(
    yup.object().shape({
      id: yup.number().integer().min(1).required(),
    })
  ),
}));

export const getById = async (
  req: Request<IParamProps, {}, {}, {}>,
  res: Response
) => {
  if (Number(req.params.id) === 99999) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .send({ errors: { default: "Registro não encontrado!" } });
  }

  return res
    .status(StatusCodes.OK)
    .json({ id: Number(req.params.id), nome: "Cidade de Teste" });
};
