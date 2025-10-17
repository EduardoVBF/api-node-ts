import { UsuariosProvider } from "../../database/providers/usuarios/index.js";
import { PasswordCrypto } from "../../shared/services/PasswordCrypto.js";
import { validation } from "../../shared/middlewares/Validation.js";
import { JWTService } from "../../shared/services/JWTService.js";
import { IUsuario } from "../../database/models/Usuario.js";
import { StatusCodes } from "http-status-codes";
import { RequestHandler } from "express";
import * as yup from "yup";

export interface IBodyProps extends Omit<IUsuario, "id" | "nome"> {}

export const signInValidation = validation((getschema) => ({
  body: getschema<IBodyProps>(
    yup.object().shape({
      email: yup.string().required().email().min(5),
      senha: yup.string().required().min(6),
    })
  ),
}));

export const signIn: RequestHandler = async (req, res) => {
  const { email, senha } = req.body;

  const usuario = await UsuariosProvider.getByEmail(email);

  if (usuario instanceof Error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: "Email ou senha inválidos",
      },
    });
  }

  const passwordMatch = await PasswordCrypto.verifyPassword(senha, usuario.senha);

  if (!passwordMatch) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: "Email ou senha inválidos",
      },
    });
  } else {
    const accessToken = JWTService.signIn({ uid: usuario.id });

    if (accessToken === "JWT_SECRET_NOT_FOUND") {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        errors: {
          default: "Erro ao gerar token de acesso",
        },
      });
    }

    return res.status(StatusCodes.OK).json({
      accessToken,
    });
  }
};
