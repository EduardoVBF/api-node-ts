import { validation } from "../../shared/middlewares/Validation.js";
import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import * as yup from "yup";

export interface IParamProps {
  id?: number;
}
export interface IBodyProps {
  nome: string;
}

export const updateByIdValidation = validation((getschema) => ({
  params: getschema<IParamProps>(
    yup.object().shape({
      id: yup.number().integer().min(1).required(),
    })
  ),
  body: getschema<IBodyProps>(
    yup.object().shape({
      nome: yup.string().trim().min(3).max(100).required(),
    })
  ),
}));

export const updateById = async (
  req: Request<IParamProps, {}, IBodyProps>,
  res: Response
) => {
  if (Number(req.params.id) === 99999) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .send({ errors: { default: "Registro não encontrado!" } });
  }


  return res
    .status(StatusCodes.NO_CONTENT).send();
};
