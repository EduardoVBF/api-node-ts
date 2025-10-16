import { PessoasProvider } from "../../database/providers/pessoas/index.js";
import { validation } from "../../shared/middlewares/Validation.js";
import { IPessoa } from "../../database/models/Pessoa.js";
import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import * as yup from "yup";

export interface IParamProps {
  id?: number;
}

export interface IBodyProps extends Omit<IPessoa, "id"> {}

export const updateByIdValidation = validation((getschema) => ({
  params: getschema<IParamProps>(
    yup.object().shape({
      id: yup.number().integer().min(1).required(),
    })
  ),
  body: getschema<IBodyProps>(
    yup.object().shape({
      email: yup.string().trim().email().required(),
      nomeCompleto: yup.string().trim().min(3).max(100).required(),
      cidadeId: yup.number().integer().min(1).required(),
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

  const result = await PessoasProvider.updateById(req.params.id, req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: { default: result.message },
    });
  }

  return res.status(StatusCodes.NO_CONTENT).json(result);
};
