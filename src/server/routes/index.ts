import { StatusCodes } from "http-status-codes";
import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  return res.send("Fala Dev!");
});

router.post("/teste", (req, res) => {

  return res.status(StatusCodes.OK).json(req.body);
});

export { router };
