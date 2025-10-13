import { validation } from "../../shared/middlewares/Validation.js";
import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import * as yup from "yup";

export interface IParamProps {
  id?: number;
}

export const deleteByIdValidation = validation((getschema) => ({
  params: getschema<IParamProps>(
    yup.object().shape({
      id: yup.number().integer().min(1).required(),
    })
  ),
}));

export const deleteById = async (
  req: Request<{}, {}, {}, IParamProps>,
  res: Response
) => {
  if (Number(req.params.id) === 99999) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      errors: { default: "Registro não encontrado!" },
    });
  }

  return res.status(StatusCodes.NO_CONTENT).send();
};
