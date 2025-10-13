// import { StatusCodes } from "http-status-codes";
import { Router } from "express";
import { CidadeController } from "../controllers/index.js";

const router = Router();

router.get("/", (req, res) => {
  return res.send("Fala Dev!");
});

router.get("/cidades", CidadeController.getAllValidation, CidadeController.getAll);
router.get("/cidades/:id", CidadeController.getByIdValidation, CidadeController.getById);
router.post("/cidades", CidadeController.createValidation, CidadeController.create);

export { router };
