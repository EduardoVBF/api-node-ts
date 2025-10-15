import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup.js";

describe("Cidades - Update by id", () => {
  it("Atualizar registro por id", async () => {
    const res1 = await testServer.post("/cidades").send({
      nome: "Cidade de Teste",
    });
    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resAtualizado = await testServer
      .put(`/cidades/${res1.body}`)
      .send({
        nome: "Cidade de Teste Atualizada",
      });
    expect(resAtualizado.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });
  it("Tentar atualizar registro que não existe", async () => {
    const res1 = await testServer.put("/cidades/999999999999999999999999").send({
      nome: "Cidade Inexistente",
    });
    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
  });
  it("Tentar atualizar sem informar o id", async () => {
    const res1 = await testServer.put("/cidades/").send({
      nome: "Cidade Sem Id",
    });
    expect(res1.statusCode).toEqual(StatusCodes.NOT_FOUND);
  });
});
