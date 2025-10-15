import { CidadesProvider } from "../../database/providers/cidades/index.js";
import { validation } from "../../shared/middlewares/Validation.js";
import { ICidade } from "../../database/models/Cidade.js";
import { StatusCodes } from "http-status-codes";
import { RequestHandler } from "express";
import * as yup from "yup";
 
export interface IBodyProps extends Omit<ICidade, "id"> {}

export const createValidation = validation((getschema) => ({
  body: getschema<IBodyProps>(
    yup.object().shape({
      nome: yup.string().required().min(3).max(100),
    })
  ),
}));

export const create: RequestHandler = async (req, res) => {
  const result = await CidadesProvider.create(req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      }
    });
  }

  return res.status(StatusCodes.CREATED).json(result);
};
