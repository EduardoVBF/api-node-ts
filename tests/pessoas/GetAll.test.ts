import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup.js";

describe("Pessoas - Get All", () => {
  let accessToken = "";

  beforeAll(async () => {
    const email = "create-usuario@gmail.com";

    await testServer.post("/cadastrar").send({
      nome: "Create Usuario",
      email,
      senha: "123456",
    });

    const signInRes = await testServer.post("/entrar").send({
      email,
      senha: "123456",
    });

    accessToken = signInRes.body.accessToken;
  });

  let cidadeId: number | undefined = undefined;

  beforeAll(async () => {
    const resCidade = await testServer
      .post("/cidades")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        nome: "Cidade teste",
      });
    cidadeId = resCidade.body;
  });

  it("Tentar buscar registros sem token de acesso", async () => {
    const res1 = await testServer.get("/pessoas");

    expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(res1.body).toHaveProperty("errors.default");
  });

  it("Buscar todos os registros de pessoas", async () => {
    const res1 = await testServer
      .post("/pessoas")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        nomeCompleto: "Pessoa de Teste",
        cidadeId: cidadeId,
        email: "testeGetAll@email.com",
      });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const res2 = await testServer
      .get("/pessoas")
      .set({ Authorization: `Bearer ${accessToken}` });

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
