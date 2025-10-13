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
  req: Request<{}, {}, {}, IParamProps>,
  res: Response
) => {
  console.log(req.params);
  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .send("Get by ID Não implementado!");
};
