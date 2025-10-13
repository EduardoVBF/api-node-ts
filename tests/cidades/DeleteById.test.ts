import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup.js";

describe("Cidades - Delete", () => {
  it("Apaga registro de cidade", async () => {
    const teste1 = await testServer.post("/cidades").send({
      nome: "São Paulo",
    });
    expect(teste1.statusCode).toEqual(StatusCodes.CREATED);

    const testeApagar1 = await testServer.delete(`/cidades/${teste1.body.id}`).send();

    expect(testeApagar1.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });
  it("Tenta apagar registro que não existe", async () => {
    const teste1 = await testServer.delete("/cidades/99999").send();

    expect(teste1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(teste1.body).toHaveProperty("errors.default");
  });
});
