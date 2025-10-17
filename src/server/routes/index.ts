import { ensureAuthenticated } from "../shared/middlewares/EnsureAuthenticated.js";
import {
  CidadesController,
  PessoasController,
  UsuariosController,
} from "../controllers/index.js";
import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  return res.send("Fala Dev!");
});

//Rota de autenticação
router.post(
  "/cadastrar",
  UsuariosController.signUpValidation,
  UsuariosController.signUp
);
router.post(
  "/entrar",
  UsuariosController.signInValidation,
  UsuariosController.signIn
);

//CRUD CIDADES
router.post(
  "/cidades",
  ensureAuthenticated,
  CidadesController.createValidation,
  CidadesController.create
);
router.get(
  "/cidades",
  ensureAuthenticated,
  CidadesController.getAllValidation,
  CidadesController.getAll
);
router.get(
  "/cidades/:id",
  ensureAuthenticated,
  CidadesController.getByIdValidation,
  CidadesController.getById
);
router.put(
  "/cidades/:id",
  ensureAuthenticated,
  CidadesController.updateByIdValidation,
  CidadesController.updateById
);
router.delete(
  "/cidades/:id",
  ensureAuthenticated,
  CidadesController.deleteByIdValidation,
  CidadesController.deleteById
);

//CRUD PESSOAS
router.post(
  "/pessoas",
  ensureAuthenticated,
  PessoasController.createValidation,
  PessoasController.create
);
router.get(
  "/pessoas",
  ensureAuthenticated,
  PessoasController.getAllValidation,
  PessoasController.getAll
);
router.get(
  "/pessoas/:id",
  ensureAuthenticated,
  PessoasController.getByIdValidation,
  PessoasController.getById
);
router.put(
  "/pessoas/:id",
  ensureAuthenticated,
  PessoasController.updateByIdValidation,
  PessoasController.updateById
);
router.delete(
  "/pessoas/:id",
  ensureAuthenticated,
  PessoasController.deleteByIdValidation,
  PessoasController.deleteById
);

export { router };
