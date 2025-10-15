import { CidadesProvider } from "../../database/providers/cidades/index.js";
import { validation } from "../../shared/middlewares/Validation.js";
import { ICidade } from "../../database/models/Cidade.js";
import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import * as yup from "yup";

export interface IParamProps {
  id?: number;
}
export interface IBodyProps extends Omit<ICidade, "id"> {}

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
  if (!req.params.id) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: { default: "O Id precisa ser informado!" },
    });
  }

  const result = await CidadesProvider.updateById(req.params.id, req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: { default: result.message },
    });
  }

  return res.status(StatusCodes.NO_CONTENT).json(result);
};
