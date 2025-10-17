import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup.js";

describe("Pessoas - Get by id", () => {
  let cidadeId: number | undefined = undefined;

  beforeAll(async () => {
    const resCidade = await testServer.post("/cidades").send({
      nome: "Cidade teste",
    });
    cidadeId = resCidade.body;
  });

  it ("Buscar registro por id", async () => {
    const res1 = await testServer.post("/pessoas").send({
      nomeCompleto: "Pessoa de Teste",
      cidadeId: cidadeId,
      email: "testeGetById@email.com",
    });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const res2 = await testServer.get(`/pessoas/${res1.body}`);

    expect(res2.statusCode).toEqual(StatusCodes.OK);

    expect(res2.body).toHaveProperty("nomeCompleto"); // verificar se um campo específico existe

    expect(res2.body).toEqual(expect.objectContaining({
      id: res1.body,
      nomeCompleto: "Pessoa de Teste",
      cidadeId: cidadeId,
      email: "testeGetById@email.com",
    }));
  });

  it("Tentar buscar registro que não existe", async () => {
    const res1 = await testServer.get("/pessoas/999999999999999999999");

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);

    expect(res1.body).toHaveProperty("errors.default");
  });
});