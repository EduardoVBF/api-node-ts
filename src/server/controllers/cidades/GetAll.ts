import { validation } from "../../shared/middlewares/Validation.js";
import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import * as yup from "yup";



export interface IQueryProps {
  page?: number;
  limit?: number;
  filter?: string | null;
}

export const getAllValidation = validation((getschema) => ({
  query: getschema<IQueryProps>(
    yup.object().shape({
      page: yup.number().integer().min(1).default(1),
      limit: yup.number().integer().min(1).max(100).default(10),
      filter: yup.string().trim().nullable().default(null),
    })
  ),
}));

export const getAll = async (
  req: Request<{}, {}, {}, IQueryProps>,
  res: Response
) => {
  console.log(req.query);
  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .send("Não implementado!");
};
