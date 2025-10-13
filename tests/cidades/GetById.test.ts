import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup.js";

describe("Cidades - Get by id", () => {
  it("Buscar registro por id", async () => {
    const res1 = await testServer.post("/cidades").send({
      nome: "Cidade de Teste",
      estado_id: 1,
    });
    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resBuscado = await testServer.get(`/cidades/${res1.body.id}`);
    expect(resBuscado.statusCode).toEqual(StatusCodes.OK);
    expect(resBuscado.body).toEqual(expect.objectContaining({
      id: res1.body.id,
      nome: "Cidade de Teste",
    }));
  });

  it("Tentar buscar registro que não existe", async () => {
    const res1 = await testServer.get("/cidades/99999");
    expect(res1.statusCode).toEqual(StatusCodes.NOT_FOUND);
    expect(res1.body).toHaveProperty("errors.default");
  });
});