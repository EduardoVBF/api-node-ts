import { JWTService } from "../services/JWTService.js";
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

  if (type !== "Bearer" || !token) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ errors: { default: "Não autorizado" } });
  }

  const jwtData = JWTService.verify(token);

  if (jwtData === "JWT_SECRET_NOT_FOUND") {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ errors: { default: "Erro ao verificar o token" } });
  } else if (jwtData === "Token inválido") {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ errors: { default: "Token inválido" } });
  }

  req.headers.idUsuario = String(jwtData.uid);

  return next();
};
