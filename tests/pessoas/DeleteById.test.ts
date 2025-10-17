import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup.js";

describe("Pessoas - DeleteById", () => {
  let cidadeId: number | undefined = undefined;

  beforeAll(async () => {
    const resCidade = await testServer.post("/cidades").send({
      nome: "Cidade teste",
    });
    cidadeId = resCidade.body;
  });

  it("Apaga registro de pessoa", async () => {
    const res1 = await testServer.post("/pessoas").send({
      nomeCompleto: "Pessoa de Teste",
      cidadeId: cidadeId,
      email: "testeDelete@email.com",
    });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const res2 = await testServer.delete(`/pessoas/${res1.body}`);

    expect(res2.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });

  it("Tentar apagar registro que não existe", async () => {
    const res1 = await testServer.delete("/pessoas/999999999999999999999");

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    
    expect(res1.body).toHaveProperty("errors.default");
  });
});