import { PessoasProvider } from "../../database/providers/pessoas/index.js";
import { validation } from "../../shared/middlewares/Validation.js";
import { IPessoa } from "../../database/models/Pessoa.js";
import { StatusCodes } from "http-status-codes";
import { RequestHandler } from "express";
import * as yup from "yup";

export interface IBodyProps extends Omit<IPessoa, "id"> {}

export const createValidation = validation((getschema) => ({
  body: getschema<IBodyProps>(
    yup.object().shape({
      email: yup.string().trim().email().required(),
      nomeCompleto: yup.string().trim().min(3).required(),
      cidadeId: yup.number().integer().min(1).required(),
    })
  ),
}));

export const create: RequestHandler = async (req, res) => {
  const result = await PessoasProvider.create(req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      }
    });
  }

  return res.status(StatusCodes.CREATED).json(result);
};