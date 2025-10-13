import { validation } from "../../shared/middlewares/Validation.js";
import { StatusCodes } from "http-status-codes";
import { RequestHandler } from "express";
import * as yup from "yup";

export interface ICidade {
  nome: string;
}

export const createValidation = validation((getschema) => ({
  body: getschema<ICidade>(
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
