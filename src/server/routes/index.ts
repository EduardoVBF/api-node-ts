// import { StatusCodes } from "http-status-codes";
import { Router } from "express";
import { CidadeController } from "../controllers/index.js";

const router = Router();

router.get("/", (req, res) => {
  return res.send("Fala Dev!");
});

router.post("/cidades", CidadeController.createValidation, CidadeController.create);
router.get("/cidades", CidadeController.getAllValidation, CidadeController.getAll);
router.get("/cidades/:id", CidadeController.getByIdValidation, CidadeController.getById);
router.put("/cidades/:id", CidadeController.updateByIdValidation, CidadeController.updateById);
router.delete("/cidades/:id", CidadeController.deleteByIdValidation, CidadeController.deleteById);

export { router };
