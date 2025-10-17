import { UsuariosProvider } from "../../database/providers/usuarios/index.js";
import { validation } from "../../shared/middlewares/Validation.js";
import { IUsuario } from "../../database/models/Usuario.js";
import { StatusCodes } from "http-status-codes";
import { RequestHandler } from "express";
import * as yup from "yup";
 
export interface IBodyProps extends Omit<IUsuario, "id"> {}

export const signUpValidation = validation((getschema) => ({
  body: getschema<IBodyProps>(
    yup.object().shape({
      nome: yup.string().required().min(3),
      email: yup.string().required().email().min(5),
      senha: yup.string().required().min(6),
    })
  ),
}));

export const signUp: RequestHandler = async (req, res) => {
  const result = await UsuariosProvider.create(req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      }
    });
  }

  return res.status(StatusCodes.CREATED).json(result);
};
