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
  

  return res.status(StatusCodes.CREATED).send({
    id: 1,
  });
};
