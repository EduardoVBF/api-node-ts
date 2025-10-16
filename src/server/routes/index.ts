// import { StatusCodes } from "http-status-codes";
import { CidadesController, PessoasController } from "../controllers/index.js";
import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  return res.send("Fala Dev!");
});

//CRUD CIDADES
router.post(
  "/cidades",
  CidadesController.createValidation,
  CidadesController.create
);
router.get(
  "/cidades",
  CidadesController.getAllValidation,
  CidadesController.getAll
);
router.get(
  "/cidades/:id",
  CidadesController.getByIdValidation,
  CidadesController.getById
);
router.put(
  "/cidades/:id",
  CidadesController.updateByIdValidation,
  CidadesController.updateById
);
router.delete(
  "/cidades/:id",
  CidadesController.deleteByIdValidation,
  CidadesController.deleteById
);

//CRUD PESSOAS
router.post(
  "/pessoas",
  PessoasController.createValidation,
  PessoasController.create
);
router.get(
  "/pessoas",
  PessoasController.getAllValidation,
  PessoasController.getAll
);
router.get(
  "/pessoas/:id",
  PessoasController.getByIdValidation,
  PessoasController.getById
);
router.put(
  "/pessoas/:id",
  PessoasController.updateByIdValidation,
  PessoasController.updateById
);
router.delete(
  "/pessoas/:id",
  PessoasController.deleteByIdValidation,
  PessoasController.deleteById
);

export { router };
