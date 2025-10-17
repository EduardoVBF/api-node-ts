import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup.js";

describe("Pessoas - Get All", () => {
  let cidadeId: number | undefined = undefined;

  beforeAll(async () => {
    const resCidade = await testServer.post("/cidades").send({
      nome: "Cidade teste",
    });
    cidadeId = resCidade.body;
  });

  it("Buscar todos os registros de pessoas", async () => {
    const res1 = await testServer.post("/pessoas").send({
      nomeCompleto: "Pessoa de Teste",
      cidadeId: cidadeId,
      email: "testeGetAll@email.com",
    });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const res2 = await testServer.get("/pessoas");

    expect(Number(res2.header["x-total-count"])).toBeGreaterThan(0);

    expect(res2.statusCode).toEqual(StatusCodes.OK);

    expect(res2.body.length).toBeGreaterThan(0);
    
    expect(res2.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: res1.body,
          nomeCompleto: "Pessoa de Teste",
          cidadeId: cidadeId,
          email: "testeGetAll@email.com",
        }),
      ])
    );
  });
});
