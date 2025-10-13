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
  res.setHeader("Access-Control-Expose-Headers", "X-Total-Count");
  res.setHeader("x-total-count", 1);
  

  return res
    .status(StatusCodes.OK).json([
      {
        id: 1,
        nome: "São Paulo",
      },
    ]);
};
