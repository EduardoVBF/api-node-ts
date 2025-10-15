import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup.js";

describe("Cidades - Update by id", () => {
  it("Atualizar registro por id", async () => {
    const res1 = await testServer.post("/cidades").send({
      nome: "Cidade de Teste",
    });
    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resAtualizado = await testServer
      .put(`/cidades/${res1.body.id}`)
      .send({
        nome: "Cidade de Teste Atualizada",
      });
    expect(resAtualizado.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });
  it("Tentar atualizar registro que não existe", async () => {
    const res1 = await testServer.put("/cidades/99999").send({
      nome: "Cidade de Teste Atualizada",
    });
    expect(res1.statusCode).toEqual(StatusCodes.NOT_FOUND);
    expect(res1.body).toHaveProperty("errors.default");
  });
});
