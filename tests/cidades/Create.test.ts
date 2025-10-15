import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup.js";

describe("Cidades - Create", () => {
  it("Criar registro de cidade", async () => {
    const teste1 = await testServer.post("/cidades").send({
      nome: "São Paulo",
    });

    expect(teste1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof teste1.body).toEqual("number");
  });
  it("Tenta criar registro de cidade com nome curto", async () => {
    const teste1 = await testServer.post("/cidades").send({
      nome: "S",
    });

    expect(teste1.statusCode).toEqual(StatusCodes.BAD_REQUEST );
    expect(teste1.body).toHaveProperty("errors.body.nome");
  });
});
