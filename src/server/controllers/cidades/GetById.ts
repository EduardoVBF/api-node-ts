import { CidadesProvider } from "../../database/providers/cidades/index.js";
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
  if (!req.params.id) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: { default: "O Id precisa ser informado!" },
    });
  }

  const result = await CidadesProvider.getById(Number(req.params.id));

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: { default: result.message },
    });
  }

  return res.status(StatusCodes.OK).json(result);
};
