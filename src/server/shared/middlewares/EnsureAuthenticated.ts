import { StatusCodes } from "http-status-codes";
import { RequestHandler } from "express";

export const ensureAuthenticated: RequestHandler = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ errors: { default: "Não autorizado" } });
  }

  const [type, token] = authorization.split(" ");

  if (type !== "Bearer") {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ errors: { default: "Não autorizado" } });
  }

  if (token !== "teste.teste.teste") {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ errors: { default: "Não autorizado" } });
  }

  return next();
};
