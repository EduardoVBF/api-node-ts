// import { StatusCodes } from "http-status-codes";
import { Router } from "express";
import { CidadesController } from "../controllers/index.js";

const router = Router();

router.get("/", (req, res) => {
  return res.send("Fala Dev!");
});

router.post("/cidades", CidadesController.createValidation, CidadesController.create);
router.get("/cidades", CidadesController.getAllValidation, CidadesController.getAll);
router.get("/cidades/:id", CidadesController.getByIdValidation, CidadesController.getById);
router.put("/cidades/:id", CidadesController.updateByIdValidation, CidadesController.updateById);
router.delete("/cidades/:id", CidadesController.deleteByIdValidation, CidadesController.deleteById);

export { router };
