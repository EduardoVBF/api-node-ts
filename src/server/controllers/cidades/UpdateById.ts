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
  req: Request<{}, {}, IBodyProps, IParamProps>,
  res: Response
) => {
  console.log(req.params);
  console.log(req.body);
  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .send("Update by ID Não implementado!");
};
