import { CidadesProvider } from "../../database/providers/cidades/index.js";
import { validation } from "../../shared/middlewares/Validation.js";
import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import * as yup from "yup";

export interface IQueryProps {
  id?: number;
  page?: number;
  limit?: number;
  filter?: string | null;
}

export const getAllValidation = validation((getschema) => ({
  query: getschema<IQueryProps>(
    yup.object().shape({
      id: yup.number().integer().default(0),
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
  const result = await CidadesProvider.getAll(
    req.query.page || 1,
    req.query.limit || 7,
    req.query.filter || "",
    Number(req.query.id) || 0
  );

  const count = await CidadesProvider.count(req.query.filter || "");

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: {
        default: result.message,
      }
    });
  } else if (count instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: {
        default: count.message,
      }
    });
  }

  res.setHeader("Access-Control-Expose-Headers", "X-Total-Count");
  res.setHeader("x-total-count", count);

  return res.status(StatusCodes.OK).json(result);
};
